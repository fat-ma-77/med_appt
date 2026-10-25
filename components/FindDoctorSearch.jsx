'use client';
import { useEffect, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { doctors } from '../lib/doctors';
import DoctorCard from './DoctorCard';
export default function FindDoctorSearch({ onBook }) {
    const [query, setQuery] = useState(''), [specialty, setSpecialty] = useState('All specialties');
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setQuery(params.get('q') || '');
        const selected = params.get('specialty');
        if (doctors.some(d => d.specialty === selected)) setSpecialty(selected);
    }, []);
    function handleSearch(event) {
        event.preventDefault();
        const params = new URLSearchParams({ q: query.trim(), specialty });
        window.location.assign('/appointments?' + params.toString());
    }
    const found = doctors.filter(d => (specialty === 'All specialties' || d.specialty === specialty) && (d.name + ' ' + d.specialty + ' ' + d.languages).toLowerCase().includes(query.trim().toLowerCase()));
    return <section aria-labelledby="find-title"><form className="search-bar" action="/appointments" method="get" onSubmit={handleSearch}><label className="search-input"><Search size={20}/><span className="sr-only">Search doctors by name, specialty or language</span><input type="search" name="q" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by doctor, specialty or language"/></label><label className="specialty-select"><SlidersHorizontal size={18}/><span className="sr-only">Specialty</span><select name="specialty" value={specialty} onChange={e => setSpecialty(e.target.value)}><option>All specialties</option>{doctors.map(d => <option key={d.id}>{d.specialty}</option>)}</select></label><button className="button" type="submit">Search</button></form><div className="result-heading"><h2 id="find-title">Find your kind of care</h2><span aria-live="polite">{found.length} fictional doctors</span></div>{found.length ? <div className="doctor-grid">{found.map(d => <DoctorCard key={d.id} doctor={d} onBook={onBook}/>)}</div> : <div className="empty-state"><Search size={28}/><h3>No doctors found</h3><p>Try a different name, language or specialty.</p><button className="button outline" onClick={() => { setQuery(''); setSpecialty('All specialties'); }}>Clear filters</button></div>}</section>;
}
