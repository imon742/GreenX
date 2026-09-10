import type { Metadata } from 'next'; import './globals.css';
export const metadata: Metadata = { title:{default:'Green X Power Engineering',template:'%s | Green X'}, description:'Solar, generator, lift, electrical engineering and maintenance solutions in Bangladesh.', icons:{icon:'/assets/mark.svg'} };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html> }
