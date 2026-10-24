import { getDb } from '../db';
import { users, sessions } from '../db/schema';
import { eq, and, gt } from 'drizzle-orm';
export const hex = (b: ArrayBuffer | Uint8Array) => Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2, '0')).join('');
export async function hashPassword(password: string, salt: string) { const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']); return hex(await crypto.subtle.deriveBits({ name: 'PBKDF2', salt: new TextEncoder().encode(salt), iterations: 100000, hash: 'SHA-256' }, key, 256)); }
export async function hashToken(t: string) { return hex(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(t))); }
export function cookieToken(r: Request) { return r.headers.get('cookie')?.split(';').map(x => x.trim()).find(x => x.startsWith('stayhealthy_session='))?.split('=')[1]; }
export function publicUser(u: typeof users.$inferSelect) { return { id: u.id, name: u.name, email: u.email, phone: u.phone, role: u.role }; }
export async function currentUser(r: Request) { const t = cookieToken(r); if (!t)
    return null; const rows = await getDb().select({ user: users }).from(sessions).innerJoin(users, eq(users.id, sessions.userId)).where(and(eq(sessions.tokenHash, await hashToken(t)), gt(sessions.expires, Date.now()))).limit(1); return rows[0]?.user || null; }
export async function createSession(id: string, r: Request) { const t = hex(crypto.getRandomValues(new Uint8Array(32))); await getDb().insert(sessions).values({ tokenHash: await hashToken(t), userId: id, expires: Date.now() + 86400000 }); return 'stayhealthy_session=' + t + '; HttpOnly; SameSite=Lax; Path=/; Max-Age=86400' + (new URL(r.url).protocol === 'https:' ? '; Secure' : ''); }
export function json(data: unknown, status = 200, headers: Record<string, string> = {}) { return Response.json(data, { status, headers: { 'Cache-Control': 'no-store', ...headers } }); }
export const validPhone = (v: unknown) => typeof v === 'string' && /^[+()\d\s-]{7,24}$/.test(v) && v.replace(/\D/g, '').length >= 7;
export const validName = (v: unknown) => typeof v === 'string' && v.trim().length >= 2 && v.trim().length <= 100;
export async function body(r: Request) { const origin = r.headers.get('origin'); if (origin && origin !== new URL(r.url).origin)
    throw new Error('Cross-origin request rejected.'); if (!r.headers.get('content-type')?.includes('application/json'))
    throw new Error('Use application/json.'); const raw = await r.text(); if (raw.length > 8192)
    throw new Error('Request too large.'); return JSON.parse(raw); }
