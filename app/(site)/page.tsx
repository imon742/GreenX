import Image from 'next/image';
import Link from 'next/link';
import { ProductCard, ProjectCard, ServiceCard } from '@/components/Cards';
import ClientShowcase from '@/components/ClientShowcase';
import Icon from '@/components/Icons';
import EstimatorLauncher from '@/components/EstimatorLauncher';
import { getClients,getProducts,getProjects,getServices,getSettings } from '@/lib/data';
import { PRODUCT_CATEGORY_META } from '@/lib/catalog';
import { PHOTO_ELECTRICAL } from '@/lib/visuals';

export default async function Home(){
  const [settings,services,projects,products,clients]=await Promise.all([getSettings(),getServices(),getProjects(),getProducts(),getClients()]);
  const featuredProjects=(projects.filter(p=>p.featured).length?projects.filter(p=>p.featured):projects).slice(0,3);
  const featuredProducts=(products.filter(p=>p.featured).length?products.filter(p=>p.featured):products).slice(0,4);
  const heroTitle=settings.hero_title || 'Sustainable & Innovative Engineering Solutions';
  const accentMatch=heroTitle.match(/Innovative Engineering Solutions$/i);
  const accent=accentMatch?.[0] || '';
  const heroBase=accent ? heroTitle.slice(0,-accent.length).trimEnd() : heroTitle;
  const metrics=[
    settings.total_projects?{value:`${settings.total_projects}+`,label:'Projects delivered'}:{value:'06',label:'Core engineering disciplines'},
    settings.total_clients?{value:`${settings.total_clients}+`,label:'Clients served'}:{value:'360°',label:'Survey to lifecycle support'},
    settings.years_experience?{value:`${settings.years_experience}+`,label:'Years of experience'}:{value:'BD',label:'Bangladesh project focus'},
  ];

  return <>
    <section className="gx-hero">
      <Image className="gx-hero-bg" src={settings.hero_image_url || '/assets/hero-engineering.svg'} alt="Industrial solar and power engineering" fill priority quality={72} sizes="100vw"/>
      <div className="gx-hero-overlay"/>
      <div className="gx-hero-gridlines"/>
      <div className="container gx-hero-layout">
        <div className="gx-hero-copy">
          <span className="gx-hero-pill"><Icon name="check"/> SUSTAINABLE ENGINEERING. PRACTICAL INNOVATION.</span>
          <h1>{heroBase}{accent&&<> <em>{accent}</em></>}</h1>
          <p>{settings.hero_subtitle}</p>
          <div className="gx-hero-actions"><Link className="gx-primary-cta" href="/solutions">Explore Our Solutions <Icon name="arrow"/></Link><Link className="gx-secondary-cta" href="/estimate-system-size">Estimate System Size</Link></div>
          <div className="gx-hero-metrics">{metrics.map(m=><div key={m.label}><strong>{m.value}</strong><span>{m.label}</span></div>)}</div>
        </div>
        <EstimatorLauncher/>
      </div>
    </section>

    <section className="gx-section gx-intro-section">
      <div className="container gx-section-head gx-section-head-wide"><div><span className="kicker">Integrated engineering</span><h2>Sustainable systems. Innovative engineering. One accountable partner.</h2></div><p>Greenex brings sustainable thinking and practical innovation into solar, power, lift, electrical infrastructure and lifecycle maintenance—so every solution is designed around real operating needs.</p></div>
      <div className="container gx-service-grid">{services.slice(0,6).map((s,i)=><ServiceCard key={s.slug} item={{...s,display_order:i+1}}/>)}</div>
    </section>

    <section className="gx-section gx-project-section">
      <div className="container gx-section-head"><div><span className="kicker">Project profiles</span><h2>See how sustainable thinking becomes practical engineering scope.</h2></div><Link href="/projects">Explore all projects <Icon name="arrow"/></Link></div>
      <div className="container gx-project-grid">{featuredProjects.map(p=><ProjectCard key={p.slug} item={p}/>)}</div>
    </section>

    <section className="gx-section gx-products-section">
      <div className="container gx-products-layout">
        <div className="gx-products-sidebar"><span className="kicker">Product families</span><h2>Technology selected around performance, efficiency and long-term value.</h2><p>Browse solar, storage, generators, lifts and critical-power equipment selected to support safer, smarter and more sustainable engineering systems.</p><div className="gx-product-category-links">{PRODUCT_CATEGORY_META.map((c,i)=><Link href={`/products/category/${c.slug}`} key={c.slug}><span>{String(i+1).padStart(2,'0')}</span><b>{c.name}</b><Icon name="arrow"/></Link>)}</div><Link href="/products" className="gx-primary-cta">Browse Full Catalog <Icon name="arrow"/></Link></div>
        <div className="gx-product-grid">{featuredProducts.map(p=><ProductCard key={p.slug} item={p}/>)}</div>
      </div>
    </section>

    <section className="gx-section gx-engineering-story">
      <div className="container gx-story-grid"><div className="gx-story-photo"><Image src={PHOTO_ELECTRICAL} alt="Engineer working on an electrical control panel" fill sizes="(max-width:900px) 100vw, 48vw"/><div className="gx-photo-shade"/><span>FIELD ENGINEERING</span></div><div className="gx-story-copy"><span className="kicker kicker-light">Why Greenex</span><h2>Innovation matters most when it works reliably in the field.</h2><p>Greenex starts with the real site, load and operating risk—then combines sustainable technology, practical engineering and lifecycle support around one dependable result.</p><div className="gx-story-points">{[['01','Survey before selection'],['02','Application-led equipment'],['03','Installation & commissioning'],['04','Lifecycle maintenance']].map(([n,t])=><div key={n}><span>{n}</span><b>{t}</b></div>)}</div><Link href="/about" className="gx-secondary-cta gx-secondary-light">How we work</Link></div></div>
    </section>

    <section className="gx-section gx-industries-section">
      <div className="container gx-section-head gx-section-head-wide"><div><span className="kicker">Industries</span><h2>Engineering solutions adapted to the way each facility operates.</h2></div><p>Engineering requirements change by building type, operating hours, critical loads and service expectations. We shape the solution around that context.</p></div>
      <div className="container gx-industry-grid">{[
        ['factory','Industrial manufacturing','Solar, standby generation, distribution and preventive maintenance for production facilities.'],
        ['building','Commercial buildings','Reliable power, lifts, backup systems and lifecycle support for offices and mixed-use properties.'],
        ['home','Residential developments','Solar, backup power and lift solutions designed around building comfort and maintainability.'],
        ['electrical','Infrastructure & institutions','Power continuity and electrical systems for institutions and essential facilities.'],
      ].map(([icon,title,copy])=><Link key={title} href="/industries"><Icon name={icon as 'factory'|'building'|'home'|'electrical'}/><h3>{title}</h3><p>{copy}</p><span>Explore applications <Icon name="arrow"/></span></Link>)}</div>
    </section>

    <section className="gx-section gx-client-section"><div className="container"><div className="gx-section-head"><div><span className="kicker kicker-light">Clients & applications</span><h2>Designed for long-term operating confidence.</h2></div></div><ClientShowcase clients={clients}/></div></section>

    <section className="gx-section gx-cta-section"><div className="container gx-final-cta"><div><span className="kicker">Start a project</span><h2>Need a sustainable and reliable engineering solution?</h2><p>Share your requirement today. Greenex will help turn it into a practical, innovative and maintainable engineering solution.</p></div><div><Link href="/estimate-system-size" className="gx-primary-cta">Estimate System Size <Icon name="arrow"/></Link><Link href="/contact" className="gx-secondary-cta">Contact Engineering Team</Link></div></div></section>
  </>;
}
