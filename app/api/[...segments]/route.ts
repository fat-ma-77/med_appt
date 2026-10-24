import { getDb } from '../../../db';
import { users, sessions, appointments, reviews } from '../../../db/schema';
import { eq, and } from 'drizzle-orm';
import { body, json, hashPassword, hex, hashToken, publicUser, currentUser, createSession, cookieToken, validName, validPhone } from '../../../lib/auth';
import { doctors, timeSlots } from '../../../lib/doctors';
async function handle(request: Request) {
    const path = new URL(request.url).pathname;
    const method = request.method;
    try {
        const db = getDb();
        if (path === '/api/auth/register' && method === 'POST') {
            const d = await body(request);
            const email = String(d.email || '').trim().toLowerCase();
            if (!validName(d.name) || !validPhone(d.phone) || !['Patient', 'Caregiver'].includes(d.role) || !/^\S+@\S+\.\S+$/.test(email) || email.length > 254 || typeof d.password !== 'string' || d.password.length < 10 || d.password.length > 128)
                return json({ error: 'Enter a valid name, email, phone and role, and a password of 10–128 characters.' }, 400);
            if ((await db.select().from(users).where(eq(users.email, email)).limit(1)).length)
                return json({ error: 'An account with this email already exists.' }, 409);
            const salt = hex(crypto.getRandomValues(new Uint8Array(16)));
            const u = { id: crypto.randomUUID(), name: d.name.trim(), email, phone: d.phone.trim(), role: d.role, passwordHash: await hashPassword(d.password, salt), salt, createdAt: Date.now() };
            await db.insert(users).values(u);
            return json({ message: 'Account created. You can now log in.', user: publicUser(u) }, 201);
        }
        if (path === '/api/auth/login' && method === 'POST') {
            const d = await body(request);
            if (typeof d.password !== 'string' || d.password.length > 128)
                return json({ error: 'Invalid email or password.' }, 401);
            const [u] = await db.select().from(users).where(eq(users.email, String(d.email || '').trim().toLowerCase())).limit(1);
            const candidate = await hashPassword(d.password, u?.salt || '0'.repeat(32));
            const expected = u?.passwordHash || '0'.repeat(64);
            let diff = 0;
            for (let i = 0; i < 64; i++)
                diff |= candidate.charCodeAt(i) ^ expected.charCodeAt(i);
            if (!u || diff)
                return json({ error: 'Invalid email or password.' }, 401);
            return json({ message: 'Logged in successfully.', user: publicUser(u) }, 200, { 'Set-Cookie': await createSession(u.id, request) });
        }
        if (path === '/api/auth/logout' && method === 'POST') {
            await body(request);
            const t = cookieToken(request);
            if (t)
                await db.delete(sessions).where(eq(sessions.tokenHash, await hashToken(t)));
            return json({ message: 'Logged out.' }, 200, { 'Set-Cookie': 'stayhealthy_session=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0' });
        }
        const u = await currentUser(request);
        if (path === '/api/profile' && method === 'GET')
            return json({ user: u ? publicUser(u) : null });
        if (!u)
            return json({ error: 'Please log in to continue.' }, 401);
        if (path === '/api/profile' && method === 'PATCH') {
            const d = await body(request);
            if (!validName(d.name) || !validPhone(d.phone))
                return json({ error: 'Enter a valid name and phone number.' }, 400);
            await db.update(users).set({ name: d.name.trim(), phone: d.phone.trim() }).where(eq(users.id, u.id));
            return json({ user: { ...publicUser(u), name: d.name.trim(), phone: d.phone.trim() } });
        }
        if (path === '/api/appointments' && method === 'GET')
            return json({ appointments: await db.select().from(appointments).where(eq(appointments.userId, u.id)) });
        if (path === '/api/appointments' && method === 'POST') {
            const d = await body(request);
            if (!validName(d.name) || !validPhone(d.phone) || !doctors.some(x => x.id === d.doctorId) || !['scheduled', 'instant'].includes(d.type))
                return json({ error: 'Check your booking details.' }, 400);
            const date = d.type === 'instant' ? new Date().toISOString().slice(0, 10) : d.date;
            const time = d.type === 'instant' ? 'now-' + crypto.randomUUID().slice(0, 8) : d.time;
            if (d.type === 'scheduled' && (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !timeSlots.includes(time) || !Number.isFinite(new Date(date + 'T' + time + ':00Z').getTime()) || new Date(date + 'T' + time + ':00Z').getTime() <= Date.now()))
                return json({ error: 'Choose a future date and time (UTC).' }, 400);
            const a = { id: crypto.randomUUID(), userId: u.id, doctorId: d.doctorId, name: d.name.trim(), phone: d.phone.trim(), date, time, type: d.type, status: 'booked', createdAt: Date.now() };
            await db.insert(appointments).values(a);
            return json({ message: 'Demo appointment booked.', appointment: a }, 201);
        }
        if (path === '/api/appointments' && method === 'PATCH') {
            const d = await body(request);
            const [a] = await db.select().from(appointments).where(and(eq(appointments.id, String(d.id)), eq(appointments.userId, u.id))).limit(1);
            if (!a)
                return json({ error: 'Appointment not found.' }, 404);
            await db.update(appointments).set({ status: 'cancelled' }).where(eq(appointments.id, a.id));
            return json({ message: 'Appointment cancelled.' });
        }
        if (path === '/api/reviews' && method === 'GET')
            return json({ reviews: await db.select().from(reviews).where(eq(reviews.userId, u.id)) });
        if (path === '/api/reviews' && method === 'POST') {
            const d = await body(request);
            if (!doctors.some(x => x.id === d.doctorId) || !Number.isInteger(d.rating) || d.rating < 1 || d.rating > 5 || typeof d.comment !== 'string' || d.comment.trim().length < 5 || d.comment.length > 1000)
                return json({ error: 'Select a doctor, a rating of 1–5, and a review of 5–1000 characters.' }, 400);
            if (!(await db.select().from(appointments).where(and(eq(appointments.userId, u.id), eq(appointments.doctorId, d.doctorId), eq(appointments.status, 'booked'))).limit(1)).length)
                return json({ error: 'Book a demo appointment with this doctor before reviewing.' }, 403);
            const review = { id: crypto.randomUUID(), userId: u.id, doctorId: d.doctorId, rating: d.rating, comment: d.comment.trim(), createdAt: Date.now() };
            await db.insert(reviews).values(review);
            return json({ message: 'Review saved. Thank you.', review }, 201);
        }
        return json({ error: 'Not found.' }, 404);
    }
    catch (error) {
        const message = String(error) + (error instanceof Error && error.cause ? String(error.cause) : '');
        if (message.includes('UNIQUE'))
            return json({ error: 'This account, appointment slot or review already exists.' }, 409);
        console.error('StayHealthy request failed');
        return json({ error: 'Unable to complete the request. Check your details and try again.' }, 400);
    }
}
export const GET = handle;
export const POST = handle;
export const PATCH = handle;
