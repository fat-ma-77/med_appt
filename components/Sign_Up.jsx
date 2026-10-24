'use client';
import { useState } from 'react';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';
export default function Sign_Up({ notify }) {
    const [busy, setBusy] = useState(false), [error, setError] = useState(''), [show, setShow] = useState(false), [done, setDone] = useState(false);
    async function register(event) {
        event.preventDefault();
        setError('');
        const form = new FormData(event.currentTarget);
        if (form.get('password') !== form.get('confirmPassword')) {
            setError('Passwords do not match.');
            return;
        }
        setBusy(true);
        try {
            // Real registration API; validation and password hashing happen on the server.
            const response = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ role: form.get('role'), name: form.get('name'), email: form.get('email'), phone: form.get('phone'), password: form.get('password') }) });
            const result = await response.json();
            if (!response.ok)
                throw new Error(result.error);
            setDone(true);
            notify(result.message);
        }
        catch (e) {
            setError(e.message || 'Unable to register. Please try again.');
        }
        finally {
            setBusy(false);
        }
    }
    if (done)
        return <div className="success-panel"><span className="success-mark">✓</span><h2>Your account is ready.</h2><p>One step closer to care. Log in to book your first demo appointment.</p><a className="button" href="/login">Continue to login <ArrowRight size={18}/></a></div>;
    return <form onSubmit={register} className="stack form" aria-label="Sign up form"><div className="form-heading"><span className="eyebrow">LET’S GET YOU STARTED</span><h1>Create your account</h1><p>Already part of StayHealthy? <a href="/login">Log in</a></p></div><div className="field"><label htmlFor="role">Role</label><select id="role" name="role" required defaultValue="Patient"><option>Patient</option><option>Caregiver</option></select></div><div className="field"><label htmlFor="name">Name</label><input id="name" name="name" autoComplete="name" placeholder="Your full name" minLength={2} maxLength={100} required/></div><div className="form-grid"><div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={254} required/></div><div className="field"><label htmlFor="phone">Phone Number</label><input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+252 61 000 0000" pattern="[+()0-9 -]{7,24}" required/></div></div><div className="field"><label htmlFor="password">Password</label><div className="password-input"><input id="password" name="password" type={show ? 'text' : 'password'} autoComplete="new-password" minLength={10} maxLength={128} placeholder="At least 10 characters" aria-describedby="password-help" required/><button type="button" className="icon-button" aria-label={show ? 'Hide password' : 'Show password'} onClick={() => setShow(!show)}>{show ? <EyeOff size={18}/> : <Eye size={18}/>}</button></div><small id="password-help">Use a unique password of 10–128 characters.</small></div><div className="field"><label htmlFor="confirmPassword">Confirm Password</label><input id="confirmPassword" name="confirmPassword" type={show ? 'text' : 'password'} autoComplete="new-password" minLength={10} maxLength={128} placeholder="Re-enter your password" required/></div><label className="checkbox"><input type="checkbox" required/>I understand this is a learning demo and will use fictional details.</label>{error && <p className="form-error" role="alert">{error}</p>}<button className="button wide" disabled={busy}>{busy ? 'Creating account…' : 'Create account'}<ArrowRight size={18}/></button><p className="form-note">Your next chapter of care starts here.</p></form>;
}
