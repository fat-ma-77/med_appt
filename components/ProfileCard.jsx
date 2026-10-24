'use client';
import { useState } from 'react';
import { Pencil, Mail, Phone, UserRound } from 'lucide-react';
export default function ProfileCard({ user, onSaved, notify }) {
    const [editing, setEditing] = useState(false), [busy, setBusy] = useState(false), [error, setError] = useState('');
    async function save(event) { event.preventDefault(); setBusy(true); setError(''); const f = new FormData(event.currentTarget); try {
        const response = await fetch('/api/profile', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: f.get('name'), phone: f.get('phone') }) });
        const result = await response.json();
        if (!response.ok)
            throw new Error(result.error);
        onSaved(result.user);
        setEditing(false);
        notify('Profile updated.');
    }
    catch (e) {
        setError(e.message);
    }
    finally {
        setBusy(false);
    } }
    return <article className="profile-card panel"><div className="profile-top"><span className="profile-avatar">{user.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</span><span className="status booked">{user.role}</span></div><h2>{user.name}</h2><p className="muted">Your personal care profile</p>{editing ? <form className="stack form" onSubmit={save}><div className="field"><label htmlFor="profile-name">Name</label><input id="profile-name" name="name" defaultValue={user.name} minLength={2} maxLength={100} required/></div><div className="field"><label htmlFor="profile-phone">Phone Number</label><input id="profile-phone" name="phone" type="tel" pattern="[+()0-9 -]{7,24}" defaultValue={user.phone} required/></div><div className="field"><label htmlFor="profile-email">Email</label><input id="profile-email" type="email" value={user.email} readOnly/><small>Email is your account identifier.</small></div>{error && <p role="alert" className="form-error">{error}</p>}<div className="button-row"><button className="button" disabled={busy}>{busy ? 'Saving…' : 'Save changes'}</button><button type="button" className="button outline" onClick={() => setEditing(false)}>Cancel</button></div></form> : <><dl className="profile-details"><div><dt><Mail size={17}/>Email</dt><dd>{user.email}</dd></div><div><dt><Phone size={17}/>Phone</dt><dd>{user.phone}</dd></div><div><dt><UserRound size={17}/>Role</dt><dd>{user.role}</dd></div></dl><button className="button outline wide" onClick={() => setEditing(true)}><Pencil size={17}/>Edit profile</button></>}</article>;
}
