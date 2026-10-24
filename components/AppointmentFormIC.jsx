'use client';
import { useState } from 'react';
// Exactly two input fields: Name and Phone Number. Doctor/type are supplied by props.
export default function AppointmentFormIC({ doctor, user, onBooked, notify }) {
    const [busy, setBusy] = useState(false), [error, setError] = useState('');
    async function submit(event) { event.preventDefault(); setBusy(true); setError(''); const f = new FormData(event.currentTarget); try {
        const response = await fetch('/api/appointments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ doctorId: doctor.id, type: 'instant', name: f.get('name'), phone: f.get('phone') }) });
        const result = await response.json();
        if (!response.ok)
            throw new Error(result.error);
        notify('Instant demo request saved.');
        await onBooked();
    }
    catch (e) {
        setError(e.message);
    }
    finally {
        setBusy(false);
    } }
    return <form className="stack form" onSubmit={submit} aria-label="Instant consultation form"><div className="field"><label htmlFor="instant-name">Name</label><input id="instant-name" name="name" defaultValue={user.name} minLength={2} maxLength={100} required autoComplete="name"/></div><div className="field"><label htmlFor="instant-phone">Phone Number</label><input id="instant-phone" name="phone" type="tel" defaultValue={user.phone} pattern="[+()0-9 -]{7,24}" required autoComplete="tel"/></div>{error && <p className="form-error" role="alert">{error}</p>}<button className="button wide" disabled={busy}>{busy ? 'Sending…' : 'Request instant consultation'}</button><small>Simulated request only. No live doctor is contacted.</small></form>;
}
