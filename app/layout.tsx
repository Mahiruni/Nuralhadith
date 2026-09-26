import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'Nur al-Hadith — نور الحديث',description:'A calm, scholarly companion for reading hadith.',manifest:'/manifest.webmanifest',themeColor:'#0d4b3f'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" dir="ltr"><body>{children}</body></html>}