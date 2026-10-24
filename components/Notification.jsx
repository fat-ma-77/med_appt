'use client';
import { Bell, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { doctors } from '../lib/doctors';
export default function Notification({ toast, onDismiss, appointments }) {
    const next = appointments.filter(a => a.status === 'booked').sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))[0];
    return <>{toast && <div className={'toast ' + toast.type} role={toast.type === 'error' ? 'alert' : 'status'}><span>{toast.type === 'error' ? <AlertCircle size={20}/> : <CheckCircle2 size={20}/>}</span><p>{toast.message}</p><button className="icon-button" aria-label="Dismiss notification" onClick={onDismiss}><X size={18}/></button></div>}{next && <aside className="appointment-banner"><div className="container"><Bell size={18}/><span>Your next demo appointment: <strong>{doctors.find(d => d.id === next.doctorId)?.name}</strong> · {next.date} · {next.type === 'instant' ? 'Instant request' : next.time + ' UTC'}</span><a href="/appointments#my-appointments">View appointment →</a></div></aside>}</>;
}
