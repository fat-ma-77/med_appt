'use client';
import { useState } from 'react';
import { HeartPulse, Menu, X, LogOut, UserRound } from 'lucide-react';
export default function Navbar({ user, onLogout, notify, view }) {
    const [open, setOpen] = useState(false), [busy, setBusy] = useState(false);
    async function logout() { setBusy(true); try {
        const response = await fetch('/api/auth/logout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' });
        if (!response.ok)
            throw new Error('Logout failed. Please try again.');
        onLogout();
        window.location.assign('/');
    }
    catch (e) {
        notify(e.message, 'error');
    }
    finally {
        setBusy(false);
    } }
    return <header className="site-header"><div className="container nav"><a className="brand" href="/" aria-label="StayHealthy home"><span className="brand-icon"><HeartPulse size={24}/></span>StayHealthy<span className="brand-dot">.</span></a><button className="menu-toggle icon-button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button><nav aria-label="Main navigation" className={open ? 'nav-links open' : 'nav-links'}><a aria-current={view === 'home' ? 'page' : undefined} href="/">Home</a><a aria-current={view === 'appointments' ? 'page' : undefined} href="/appointments">Appointments</a><a aria-current={view === 'reviews' ? 'page' : undefined} href="/reviews">Reviews</a>{user ? <><a href="/reports">Reports</a><a className="profile-link" href="/profile"><UserRound size={17}/>{user.name.split(' ')[0]}</a><button className="button outline small" onClick={logout} disabled={busy}><LogOut size={16}/>{busy ? 'Logging out…' : 'Logout'}</button></> : <><a className="login-link" href="/login">Login</a><a className="button small" href="/signup">Sign Up <span aria-hidden="true">↗</span></a></>}</nav></div></header>;
}
