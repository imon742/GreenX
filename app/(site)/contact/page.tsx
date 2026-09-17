import Link from 'next/link';
import QuoteForm from '@/components/QuoteForm';
import Icon from '@/components/Icons';
import { getSettings } from '@/lib/data';

export const metadata={title:'Contact',description:'Contact Greenex Power Engineering for solar, generator, lift, electrical and maintenance project enquiries in Bangladesh.'};

export default async function Contact(){
  const s=await getSettings(); const wa=(s.whatsapp||s.phone||'').replace(/\D/g,'');
  const mapHref=s.map_url||(s.address?`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.address)}`:'');
  return <>
    <section className="contact-hero-v3"><div className="container"><span className="kicker kicker-light">Contact Greenex</span><h1>Bring us the requirement. We’ll help shape the engineering solution.</h1><p>For project enquiries, equipment selection, maintenance requests and technical proposals across Bangladesh.</p></div></section>

    <section id="quote" className="section-v3"><div className="container quote-layout-v3 contact-layout-v3"><div className="contact-card-v3"><span className="kicker">Direct contact</span><h2>Talk to the team.</h2><p>For urgent project discussions, phone or WhatsApp is the fastest route.</p><div className="contact-actions-v3">{s.phone&&<a href={`tel:${s.phone}`}><Icon name="phone"/><span><small>Phone</small><b>{s.phone}</b></span><Icon name="arrow"/></a>}{wa&&<a target="_blank" rel="noreferrer" href={`https://wa.me/${wa}`}><Icon name="whatsapp"/><span><small>WhatsApp</small><b>Message Greenex</b></span><Icon name="arrow"/></a>}{s.email&&<a href={`mailto:${s.email}`}><Icon name="mail"/><span><small>Email</small><b>{s.email}</b></span><Icon name="arrow"/></a>}{s.address&&<a target="_blank" rel="noreferrer" href={mapHref}><Icon name="location"/><span><small>Head office</small><b>{s.address}</b></span><Icon name="arrow"/></a>}</div><div className="contact-note"><b>Project information that helps</b><p>Site location, expected capacity/load, current problem, preferred timeline and any existing equipment details.</p></div></div><QuoteForm/></div></section>

    <section className="section-v3 section-soft-v3"><div className="container simple-cta-v3"><div><span className="kicker">Explore first</span><h2>Need more context before you contact us?</h2><p>Review solution capabilities, product categories and project case studies.</p></div><div className="cta-link-group"><Link className="btn btn-secondary" href="/solutions">Solutions</Link><Link className="btn btn-secondary" href="/products">Products</Link><Link className="btn btn-primary" href="/projects">Projects <Icon name="arrow"/></Link></div></div></section>
  </>;
}
