'use client';
import { useState } from 'react';
import { ArrowUpRight, Languages, CalendarDays } from 'lucide-react';
export default function DoctorCard({ doctor, onBook, appointment, setAppointments, onCancelled, notify }) {
    const [busy, setBusy] = useState(false), [confirm, setConfirm] = useState(false);
    async function cancelAppointment() { setBusy(true); try {
        const response = await fetch('/api/appointments', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: appointment.id }) });
        const result = await response.json();
        if (!response.ok)
            throw new Error(result.error);
        setAppointments(current => current.filter(item => item.id !== appointment.id));
        notify('Appointment cancelled.');
        await onCancelled();
    }
    catch (e) {
        notify(e.message, 'error');
    }
    finally {
        setBusy(false);
        setConfirm(false);
    } }
    return <article className="doctor-card"><div className={'doctor-portrait ' + doctor.color}><span className="portrait-orbit"/><span className="doctor-initials">{doctor.initials}</span><span className="portrait-label">Fictional clinician</span></div><div className="doctor-body"><span className="eyebrow">{doctor.specialty}</span><h3>{doctor.name}</h3><p>{doctor.experience}</p><div className="doctor-languages"><Languages size={16}/>{doctor.languages}</div>{appointment ? <div className="appointment-details"><p><CalendarDays size={16}/>{appointment.date} · {appointment.type === 'instant' ? 'Instant demo request' : appointment.time + ' UTC'}</p><span className={'status ' + appointment.status}>{appointment.status}</span>{appointment.status === 'booked' && (confirm ? <div className="cancel-confirm"><p>Cancel this appointment?</p><button className="button danger small" disabled={busy} onClick={cancelAppointment}>{busy ? 'Cancelling…' : 'Yes, cancel'}</button><button className="text-button" onClick={() => setConfirm(false)}>Keep appointment</button></div> : <button className="text-button danger-text" onClick={() => setConfirm(true)}>Cancel appointment</button>)}</div> : <button className="button outline wide" onClick={() => onBook(doctor)}>Book appointment<ArrowUpRight size={17}/></button>}</div></article>;
}
