import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'StayHealthy | Care within reach',description:'StayHealthy is a fictional nonprofit healthcare platform. Explore doctors, book appointments, and manage your care online.',keywords:['StayHealthy','healthcare','appointments','telehealth','patient portal'],robots:{index:true,follow:true},openGraph:{title:'StayHealthy | Care within reach',description:'A little closer to better care. A fictional healthcare booking project.',type:'website'},icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>;}
