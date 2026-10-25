'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, CalendarDays, ShieldCheck, HeartHandshake, Video, Search, Check, FileText, Download, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Sign_Up from '../components/Sign_Up';
import Login from '../components/Login';
import FindDoctorSearch from '../components/FindDoctorSearch';
import AppointmentForm from '../components/AppointmentForm';
import AppointmentFormIC from '../components/AppointmentFormIC';
import DoctorCard from '../components/DoctorCard';
import Notification from '../components/Notification';
import GiveReviews from '../components/GiveReviews';
import ProfileCard from '../components/ProfileCard';
import CareIllustration from '../components/CareIllustration';
import { doctors } from '../lib/doctors';
function BookingDialog({ doctor, user, onClose, onBooked, notify }) {
    const ref = useRef(null), [mode, setMode] = useState('scheduled');
    useEffect(() => { const d = ref.current; d.showModal(); return () => d.close(); }, []);
    return <dialog ref={ref} className="booking-dialog" onCancel={onClose} aria-labelledby="booking-title"><div className="dialog-heading"><div><span className="eyebrow">A MOMENT FOR YOUR HEALTH</span><h2 id="booking-title">Book with {doctor.name}</h2><p>{doctor.specialty} · Fictional clinician</p></div><button autoFocus className="icon-button" onClick={onClose} aria-label="Close booking"><X /></button></div><div className="segmented" role="group" aria-label="Appointment type"><button aria-pressed={mode === 'scheduled'} onClick={() => setMode('scheduled')}>Scheduled appointment</button><button aria-pressed={mode === 'instant'} onClick={() => setMode('instant')}>Instant consultation</button></div>{mode === 'scheduled' ? <AppointmentForm doctor={doctor} user={user} onSubmit={onBooked} notify={notify}/> : <AppointmentFormIC doctor={doctor} user={user} onBooked={onBooked} notify={notify}/>}</dialog>;
}
function Home() {
    return <>
 <section className="hero container"><div className="hero-copy"><span className="pill"><span className="live-dot"/>A LITTLE CLOSER TO BETTER CARE</span><h1>Good care.<br />Closer to <em>you.</em></h1><p>Wherever life takes you, your wellbeing comes first. Find a doctor, book a visit, and take your next step toward feeling better.</p><div className="hero-actions"><a className="button large" href="/appointments">Find your doctor<ArrowUpRight size={21}/></a><a className="subtle-link" href="#how-it-works">How it works<ArrowRight size={17}/></a></div><div className="hero-footnote"><ShieldCheck size={18}/><span>Built for access. Designed around you.</span></div></div><div className="hero-art"><CareIllustration /><div className="floating-card top-card"><span className="circle-icon peach"><Video size={21}/></span><div><strong>Care, wherever you are</strong><small>Explore a simpler way to connect</small></div></div><div className="floating-card bottom-card"><span className="circle-icon"><CalendarDays size={23}/></span><div><strong>Your next step, made easy</strong><small>Find a time that fits your day</small></div><span className="tiny-check"><Check size={15}/></span></div><span className="art-caption">Illustration · StayHealthy learning project</span></div></section>
 <section className="promise-strip"><div className="container promise-grid"><div><HeartHandshake /><span><strong>People-first care</strong><small>A welcoming place to start</small></span></div><div><Video /><span><strong>Connect from anywhere</strong><small>Less travel. More possibility.</small></span></div><div><CalendarDays /><span><strong>Appointments that fit</strong><small>Your schedule, your next step</small></span></div></div></section>
 <section className="section container" id="how-it-works"><div className="section-heading"><div><span className="eyebrow">SIMPLE STEPS, THOUGHTFUL CARE</span><h2>A healthier day starts here.</h2></div><p>From finding the right specialist to keeping your care in one place, we make the next step feel manageable.</p></div><div className="steps-grid">{[{ n: '01', icon: Search, title: 'Find your doctor', body: 'Explore specialties and find a clinician who speaks your language.' }, { n: '02', icon: CalendarDays, title: 'Choose your moment', body: 'Book a scheduled visit or try an instant consultation request.' }, { n: '03', icon: HeartHandshake, title: 'Keep care connected', body: 'Manage appointments, update your profile, and share your experience.' }].map(({ n, icon: Icon, title, body }) => <article key={n} className="step"><div className="step-top"><Icon size={27}/><span>{n}</span></div><h3>{title}</h3><p>{body}</p></article>)}</div></section>
 <section className="specialties-section"><div className="container"><div className="section-heading"><div><span className="eyebrow">A PLACE FOR EVERYDAY WELLBEING</span><h2>The right kind of support.</h2></div><a className="subtle-link" href="/appointments">Explore doctors<ArrowUpRight size={18}/></a></div><div className="specialties">{doctors.map(d => <a className={'specialty-card ' + d.color} key={d.id} href="/appointments"><span>{d.specialty}</span><ArrowUpRight size={22}/><p>{d.experience}</p></a>)}</div></div></section>
 <section className="container mission-section"><div><span className="eyebrow">OUR PURPOSE</span><h2>Distance should never<br />stand in the way of care.</h2></div><div><p>StayHealthy imagines a world where people in remote and underserved communities can connect with healthcare more easily.</p><p>Built as a fictional nonprofit platform, this project explores what accessible, patient-friendly digital care could look like.</p><a className="subtle-link" href="/signup">Take the first step<ArrowRight size={18}/></a></div></section>
 <section className="container cta"><span className="eyebrow">MAKE ROOM FOR YOUR WELLBEING</span><h2>Your next step starts with you.</h2><a className="button light" href="/signup">Create your account<ArrowUpRight size={20}/></a></section>
 </>;
}
function AuthShell({ children, signup }) { return <main className="auth-layout container"><aside className="auth-story"><a href="/" className="back-link">← Back to home</a><h2>Care that meets<br />you <em>where you are.</em></h2><p>A thoughtful space to connect with doctors and keep your wellbeing within reach.</p><div className="auth-illustration"><CareIllustration /></div><div className="auth-promises"><span><Check size={17}/>Easy appointment booking</span><span><Check size={17}/>Your care in one place</span></div></aside><section className={'auth-form-panel ' + (signup ? 'signup-panel' : '')}>{children}</section></main>; }
export default function App({ initialView = 'home' }) {
    const [user, setUser] = useState(null), [loading, setLoading] = useState(true), [appointments, setAppointments] = useState([]), [reviews, setReviews] = useState([]), [toast, setToast] = useState(null), [selected, setSelected] = useState(null), [dataError, setDataError] = useState('');
    const notify = (message, type = 'success') => setToast({ message, type });
    async function refresh() { const [ar, rr] = await Promise.all([fetch('/api/appointments'), fetch('/api/reviews')]); if (!ar.ok || !rr.ok)
        throw new Error('Unable to load your appointments. Please try again.'); const [a, r] = await Promise.all([ar.json(), rr.json()]); setAppointments(a.appointments); setReviews(r.reviews); setDataError(''); }
    useEffect(() => { let alive = true; (async () => { try {
        const response = await fetch('/api/profile');
        if (!response.ok)
            throw new Error('Unable to connect to your account.');
        const result = await response.json();
        if (alive) {
            setUser(result.user);
            if (result.user)
                await refresh();
        }
    }
    catch (e) {
        if (alive)
            setDataError(e.message);
    }
    finally {
        if (alive)
            setLoading(false);
    } })(); return () => { alive = false; }; }, []);
    const protectedView = ['reviews', 'profile', 'reports'].includes(initialView);
    function book(d) { if (!user) {
        notify('Please log in or sign up to book an appointment.', 'error');
        return;
    } setSelected(d); }
    const pageTitles = { appointments: ['YOUR WELLBEING, YOUR NEXT STEP', 'Find care that feels right.', 'Explore our fictional clinicians and book a demo appointment.'], reviews: ['YOUR VOICE MATTERS', 'Share your experience.', 'Thoughtful feedback helps us make the next visit better.'], profile: ['A LITTLE ABOUT YOU', 'Your care. Your profile.', 'Keep your contact details up to date.'], reports: ['YOUR CARE, IN ONE PLACE', 'Patient reports.', 'Explore a fictional sample report and prescription.'] };
    return <><a className="skip-link" href="#main">Skip to content</a><Navbar user={user} view={initialView} notify={notify} setUser={setUser} setAppointments={setAppointments} setReviews={setReviews}/>
 {/* Mounted outside individual pages for application-wide notification visibility. */}
 <Notification toast={toast} onDismiss={() => setToast(null)} appointments={appointments}/>
 {initialView === 'home' ? <main id="main"><Home /></main> : ['signup', 'login'].includes(initialView) ? <div id="main"><AuthShell signup={initialView === 'signup'}>{initialView === 'signup' ? <Sign_Up notify={notify}/> : <Login onLogin={setUser} notify={notify}/>}</AuthShell></div> : <main id="main" className="container inner-main"><div className="page-heading"><span className="eyebrow">{pageTitles[initialView]?.[0]}</span><h1>{pageTitles[initialView]?.[1]}</h1><p>{pageTitles[initialView]?.[2]}</p></div>{dataError && <div className="form-error" role="alert">{dataError}<button className="text-button" onClick={() => window.location.reload()}>Try again</button></div>}{loading ? <p role="status" className="loading">Getting things ready…</p> : protectedView && !user ? <div className="empty-state"><ShieldCheck size={30}/><h2>A space just for you.</h2><p>Log in to see your {initialView}.</p><a className="button" href="/login">Login<ArrowRight size={18}/></a></div> : <>
 {initialView === 'appointments' && <><FindDoctorSearch onBook={book}/><section id="my-appointments" className="my-appointments"><div className="result-heading"><h2>Your appointments</h2>{!user && <a href="/login">Login to view →</a>}</div>{!appointments.some(a => a.status === 'booked') ? <div className="quiet-note">{user ? 'No appointments yet. Find your doctor above to get started.' : 'Your appointments will appear here after you log in.'}</div> : <div className="doctor-grid">{appointments.filter(a => a.status === 'booked').map(a => <DoctorCard key={a.id} doctor={doctors.find(d => d.id === a.doctorId) || doctors[0]} appointment={a} setAppointments={setAppointments} onCancelled={refresh} notify={notify}/>)}</div>}</section></>}
 {initialView === 'reviews' && <GiveReviews user={user} appointments={appointments} reviews={reviews} onSaved={refresh} notify={notify}/>}
 {initialView === 'profile' && <ProfileCard user={user} onSaved={setUser} notify={notify}/>}
 {initialView === 'reports' && <section className="report-card panel"><span className="circle-icon"><FileText size={27}/></span><div><span className="eyebrow">FICTIONAL SAMPLE · PDF</span><h2>Patient visit & prescription</h2><p>A sample patient summary prepared for this course project. It is not your personal medical record.</p><div className="report-meta"><span>Patient: Amina Demo</span><span>Visit: 24 October 2026</span></div></div><a className="button" href="/patient_report.pdf" download><Download size={18}/>Download sample report</a></section>}
 </>}</main>}
 {selected && user && <BookingDialog doctor={selected} user={user} onClose={() => setSelected(null)} onBooked={async () => { await refresh(); setSelected(null); }} notify={notify}/>}
 <footer className="site-footer"><div className="container footer-main"><a className="brand" href="/">StayHealthy<span className="brand-dot">.</span></a><p>Care within reach. A fictional nonprofit healthcare platform.</p><nav aria-label="Footer navigation"><a href="/appointments">Appointments</a><a href="/reports">Reports</a><a href="/signup">Sign Up</a></nav></div><div className="container footer-bottom"><span>© 2026 StayHealthy · Educational project</span><span>Demo only. No real medical services or emergency support.</span></div></footer></>;
}
