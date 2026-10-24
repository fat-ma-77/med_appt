import App from '../App';
import { notFound } from 'next/navigation';
export default async function Page({params}: {params: Promise<{view:string}>}) {const {view}=await params;if(!['signup','login','appointments','reviews','profile','reports'].includes(view))notFound();return <App initialView={view}/>;}
