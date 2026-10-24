'use client';
import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { doctors } from '../lib/doctors';
import DoctorCard from './DoctorCard';
export default function FindDoctorSearch({ onBook }) {
    const [query, setQuery] = useState(''), [specialty, setSpecialty] = useState('All specialties');
    const found = doctors.filter(d => (specialty === 'All specialties' || d.specialty === specialty) && (d.name + ' ' + d.specialty + ' ' + d.languages).toLowerCase().includes(query.trim().toLowerCase()));
    return <section aria-labelledby="find-title"><div className="search-bar"><label className="search-input"><Search size={20}/><span className="sr-only">Search doctors by name, specialty or language</span><input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by doctor, specialty or language"/></label><label className="specialty-select"><SlidersHorizontal size={18}/><span className="sr-only">Specialty</span><select value={specialty} onChange={e => setSpecialty(e.target.value)}><option>All specialties</option>{doctors.map(d => <option key={d.id}>{d.specialty}</option>)}</select></label></div><div className="result-heading"><h2 id="find-title">Find your kind of care</h2><span aria-live="polite">{found.length} fictional doctors</span></div>{found.length ? <div className="doctor-grid">{found.map(d => <DoctorCard key={d.id} doctor={d} onBook={onBook}/>)}</div> : <div className="empty-state"><Search size={28}/><h3>No doctors found</h3><p>Try a different name, language or specialty.</p><button className="button outline" onClick={() => { setQuery(''); setSpecialty('All specialties'); }}>Clear filters</button></div>}</section>;
}
