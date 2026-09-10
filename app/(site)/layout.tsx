import Header from '@/components/Header'; import Footer from '@/components/Footer'; import { getSettings } from '@/lib/data';
export default async function SiteLayout({children}:{children:React.ReactNode}){ const settings=await getSettings(); return <><Header settings={settings}/><main>{children}</main><Footer settings={settings}/></> }
