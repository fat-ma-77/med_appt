'use client';
import { useState } from 'react';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';
export default function Login({ onLogin, notify }) {
    const [busy, setBusy] = useState(false), [error, setError] = useState(''), [show, setShow] = useState(false);
    async function login(event) {
        event.preventDefault();
        setError('');
        setBusy(true);
        const form = new FormData(event.currentTarget);
        try {
            // Authenticate against the server API; the session uses an HttpOnly cookie.
            const response = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: form.get('email'), password: form.get('password') }) });
            const result = await response.json();
            if (!response.ok)
                throw new Error(result.error);
            // The API also returns authtoken for cURL/Bearer clients. The browser
            // keeps using its HttpOnly session cookie rather than storing that token.
            sessionStorage.setItem('stayhealthy_user', JSON.stringify(result.user));
            onLogin(result.user);
            notify('Welcome back, ' + result.user.name.split(' ')[0] + '.');
            window.location.assign('/appointments');
        }
        catch (e) {
            setError(e.message || 'Unable to log in.');
        }
        finally {
            setBusy(false);
        }
    }
    return <form className="stack form login-form" onSubmit={login} aria-label="Login form"><div className="form-heading"><span className="eyebrow">YOUR CARE, ALL TOGETHER</span><h1>Good to see you again.</h1><p>Log in to pick up where you left off.</p></div><div className="field"><label htmlFor="login-email">Email</label><input id="login-email" type="email" name="email" autoComplete="email" placeholder="you@example.com" required/></div><div className="field"><label htmlFor="login-password">Password</label><div className="password-input"><input id="login-password" name="password" type={show ? 'text' : 'password'} autoComplete="current-password" maxLength={128} placeholder="Enter your password" required/><button className="icon-button" type="button" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'}>{show ? <EyeOff size={18}/> : <Eye size={18}/>}</button></div></div>{error && <p role="alert" className="form-error">{error}</p>}<button className="button wide" disabled={busy}>{busy ? 'Logging in…' : 'Login'}<ArrowRight size={18}/></button><p className="form-note">New to StayHealthy? <a href="/signup">Create an account</a></p><div className="quiet-note">Educational demo · Please use fictional information.</div></form>;
}
