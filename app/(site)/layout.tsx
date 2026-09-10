import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';
import NavigationFeedback from '@/components/NavigationFeedback';
import { getSettings } from '@/lib/data';

export default async function SiteLayout({children}:{children:React.ReactNode}){
  const settings=await getSettings();
  return <>
    <NavigationFeedback/>
    <Header settings={settings}/>
    <main>{children}</main>
    <Footer settings={settings}/>
    <FloatingContact settings={settings}/>
  </>;
}
