'use client';
import { useState } from 'react';
import { timeSlots } from '../lib/doctors';
export default function AppointmentForm({ doctor, user, onSubmit, notify }) {
    const [busy, setBusy] = useState(false), [error, setError] = useState('');
    async function submit(event) { event.preventDefault(); setBusy(true); setError(''); const f = new FormData(event.currentTarget); try {
        const values = { doctorId: doctor.id, type: 'scheduled', name: f.get('name'), phone: f.get('phone'), date: f.get('date'), time: f.get('time') };
        const response = await fetch('/api/appointments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) });
        const result = await response.json();
        if (!response.ok)
            throw new Error(result.error);
        notify('Appointment booked with ' + doctor.name + '.');
        await onSubmit(values);
    }
    catch (e) {
        setError(e.message);
    }
    finally {
        setBusy(false);
    } }
    return <form className="stack form" onSubmit={submit} aria-label="Scheduled appointment form"><div className="field"><label htmlFor="booking-name">Name</label><input id="booking-name" name="name" defaultValue={user.name} minLength={2} maxLength={100} required autoComplete="name"/></div><div className="field"><label htmlFor="booking-phone">Phone Number</label><input id="booking-phone" name="phone" type="tel" defaultValue={user.phone} pattern="[+()0-9 -]{7,24}" required autoComplete="tel"/></div><div className="form-grid"><div className="field"><label htmlFor="booking-date">Date</label><input id="booking-date" name="date" type="date" min={new Date().toISOString().slice(0, 10)} required/></div><div className="field"><label htmlFor="booking-time">Time (UTC)</label><select id="booking-time" name="time" defaultValue="" required><option value="" disabled>Choose a time</option>{timeSlots.map(t => <option key={t}>{t}</option>)}</select></div></div>{error && <p className="form-error" role="alert">{error}</p>}<button className="button wide" disabled={busy}>{busy ? 'Booking…' : 'Confirm appointment'}</button><small>This is a simulated booking. No clinical service is provided.</small></form>;
}
