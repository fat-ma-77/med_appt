'use client';
import { useState } from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { doctors } from '../lib/doctors';
export default function GiveReviews({ appointments, reviews, onSaved, notify }) {
    const eligible = doctors.filter(d => appointments.some(a => a.doctorId === d.id && a.status === 'booked'));
    const [doctorId, setDoctorId] = useState(eligible[0]?.id || ''), [busy, setBusy] = useState(false), [error, setError] = useState('');
    const submitted = reviews.find(r => r.doctorId === doctorId);
    async function submit(event) { event.preventDefault(); setBusy(true); setError(''); const f = new FormData(event.currentTarget); try {
        const response = await fetch('/api/reviews', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ doctorId, rating: Number(f.get('rating')), comment: f.get('comment') }) });
        const result = await response.json();
        if (!response.ok)
            throw new Error(result.error);
        await onSaved();
        notify('Thank you. Your review has been saved.');
    }
    catch (e) {
        setError(e.message);
    }
    finally {
        setBusy(false);
    } }
    if (!eligible.length)
        return <div className="empty-state"><Star size={32}/><h2>Your experience matters.</h2><p>Book a demo appointment first, then share feedback about your doctor.</p><a className="button" href="/appointments">Find a doctor</a></div>;
    return <div className="review-layout"><section className="panel"><div className="field"><label htmlFor="review-doctor">Choose your doctor</label><select id="review-doctor" value={doctorId} onChange={e => { setDoctorId(e.target.value); setError(''); }}>{eligible.map(d => <option value={d.id} key={d.id}>{d.name}</option>)}</select></div><form onSubmit={submit} className="stack form review-form" aria-label="Review form"><fieldset disabled={Boolean(submitted) || busy} key={doctorId + (submitted ? 'saved' : 'new')}><legend>How was your experience?</legend><div className="field"><label htmlFor="review-rating">Rating</label><select id="review-rating" name="rating" defaultValue={submitted?.rating || ''} required><option value="" disabled>Select a rating</option>{[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} {n === 1 ? 'star' : 'stars'}</option>)}</select></div><div className="field"><label htmlFor="review-comment">Your review</label><textarea id="review-comment" name="comment" rows={5} minLength={5} maxLength={1000} defaultValue={submitted?.comment || ''} placeholder="Tell us about your demo booking experience…" required/></div><button className="button wide" disabled={Boolean(submitted) || busy}>{submitted ? 'Review submitted' : busy ? 'Submitting…' : 'Submit review'}</button></fieldset>{submitted && <p className="saved-message" role="status"><CheckCircle2 size={18}/>Your review is saved. This form is now disabled.</p>}{error && <p className="form-error" role="alert">{error}</p>}</form></section><aside className="review-aside"><span className="large-star">✳</span><h2>A little feedback.<br />A better experience.</h2><p>Share one review per doctor. Your submitted feedback stays saved when you return.</p><small>All doctors and appointments in this project are fictional.</small></aside></div>;
}
