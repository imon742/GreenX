import Image from 'next/image';
import Link from 'next/link';
import SectionTitle from '@/components/SectionTitle';
import { ProductCard, ProjectCard, ServiceCard } from '@/components/Cards';
import QuoteForm from '@/components/QuoteForm';
import ClientShowcase from '@/components/ClientShowcase';
import Icon, { productIconName } from '@/components/Icons';
import { getClients,getProducts,getProjects,getServices,getSettings } from '@/lib/data';
import { PRODUCT_CATEGORY_META } from '@/lib/catalog';
import { PHOTO_ELECTRICAL, PHOTO_GENERATOR } from '@/lib/visuals';

export default async function Home(){
  const [settings,services,projects,products,clients]=await Promise.all([getSettings(),getServices(),getProjects(),getProducts(),getClients()]);
  const featuredProjects=(projects.filter(p=>p.featured).length?projects.filter(p=>p.featured):projects).slice(0,3);
  const featuredProducts=(products.filter(p=>p.featured).length?products.filter(p=>p.featured):products).slice(0,4);
  const metrics=[
    {value:String(services.length).padStart(2,'0'),label:'Core engineering disciplines'},
    settings.total_projects ? {value:`${settings.total_projects}+`,label:'Projects delivered'} : {value:'01',label:'Partner from survey to support'},
    settings.total_clients ? {value:`${settings.total_clients}+`,label:'Clients served'} : {value:'BD',label:'Focused on Bangladesh projects'},
    settings.years_experience ? {value:`${settings.years_experience}+`,label:'Years of engineering experience'} : {value:'AMC',label:'Lifecycle maintenance support'},
  ];
  return <>
    <section className="home-hero">
      <div className="container home-hero-grid">
        <div className="home-hero-copy">
          <span className="kicker kicker-light">Power • Energy • Infrastructure</span>
          <h1>{settings.hero_title}</h1>
          <p>{settings.hero_subtitle}</p>
          <div className="hero-actions-v3">
            <Link className="btn btn-primary" href="/contact#quote">Start a Project <Icon name="arrow"/></Link>
            <Link className="btn btn-dark-outline" href="/projects">View Project Work</Link>
          </div>
          <div className="hero-capabilities">
            <span><Icon name="check"/> Site survey & engineering</span>
            <span><Icon name="check"/> Installation & commissioning</span>
            <span><Icon name="check"/> Maintenance & AMC support</span>
          </div>
        </div>

        <div className="hero-photo-card">
          <Image src={settings.hero_image_url || '/assets/hero-engineering.svg'} alt="Industrial energy engineering application" fill priority sizes="(max-width: 900px) 100vw, 48vw" />
          <div className="hero-photo-shade"/>
          <div className="hero-photo-label"><span>Engineering application</span><b>Reliable systems for real operating conditions.</b></div>
          <div className="hero-floating-note"><Icon name="solar"/><span><small>Solar • Power • Lift</small><b>Integrated project delivery</b></span></div>
        </div>
      </div>
    </section>

    <section className="metric-band">
      <div className="container metric-grid">{metrics.map((m,i)=><div key={i}><strong>{m.value}</strong><span>{m.label}</span></div>)}</div>
    </section>

    <section className="section-v3">
      <div className="container">
        <div className="section-heading-row"><SectionTitle eyebrow="What we do" title="Engineering systems built for uptime." body="From renewable energy to standby power and vertical mobility, Green X brings design, supply, installation and support under one engineering partner."/><Link href="/solutions" className="arrow-link">All solutions <Icon name="arrow"/></Link></div>
        <div className="service-grid-v3">{services.slice(0,6).map((s,i)=><ServiceCard key={s.slug} item={{...s,display_order:i+1}}/>)}</div>
      </div>
    </section>

    <section className="feature-story section-v3 section-dark-v3">
      <div className="container feature-story-grid">
        <div className="feature-photo-stack">
          <div className="feature-photo feature-photo-main"><Image src={PHOTO_GENERATOR} alt="Industrial backup generator application" fill sizes="(max-width: 900px) 100vw, 46vw"/></div>
          <div className="feature-photo feature-photo-small"><Image src={PHOTO_ELECTRICAL} alt="Electrical engineering control panel" fill sizes="320px"/></div>
          <div className="feature-badge"><b>One system view</b><span>Generation • Distribution • Protection • Backup</span></div>
        </div>
        <div className="feature-story-copy">
          <span className="kicker kicker-light">Power continuity</span>
          <h2>Engineering that works together—not equipment sold in isolation.</h2>
          <p>Green X approaches power requirements as a complete operating system: understand the load, select the right equipment, integrate controls, commission safely and plan maintenance from day one.</p>
          <div className="feature-checks">
            <span><Icon name="check"/><b>Load-based selection</b><small>Capacity matched to the actual application.</small></span>
            <span><Icon name="check"/><b>Integrated installation</b><small>Generator, UPS, panels and protection coordinated together.</small></span>
            <span><Icon name="check"/><b>Lifecycle support</b><small>Preventive service and AMC planning after handover.</small></span>
          </div>
          <Link className="btn btn-primary" href="/solutions/generator-backup-power">Explore Power Solutions <Icon name="arrow"/></Link>
        </div>
      </div>
    </section>

    <section className="section-v3 section-soft-v3">
      <div className="container">
        <div className="section-heading-row"><SectionTitle eyebrow="Product categories" title="Choose equipment by application." body="Browse dedicated product categories, compare key specifications and request a project-specific quotation."/><Link href="/products" className="arrow-link">Complete catalog <Icon name="arrow"/></Link></div>
        <div className="product-category-grid-v3">{PRODUCT_CATEGORY_META.map(c=><Link key={c.slug} href={`/products/category/${c.slug}`} className="product-category-tile"><span><Icon name={productIconName(c.slug)}/></span><div><small>{c.accent}</small><h3>{c.name}</h3><p>{c.short}</p></div><Icon name="arrow" className="tile-arrow"/></Link>)}</div>
        <div className="featured-products-wrap"><div className="mini-heading"><span>Featured equipment</span><Link href="/products">See all products →</Link></div><div className="product-grid-v3">{featuredProducts.map(p=><ProductCard key={p.slug} item={p}/>)}</div></div>
      </div>
    </section>

    <section className="section-v3">
      <div className="container">
        <div className="section-heading-row"><SectionTitle eyebrow="Project portfolio" title="Scope, capacity and engineering context—not just photos." body="Project pages are designed to show what was required, what was delivered and the technical scope behind the installation."/><Link href="/projects" className="arrow-link">Explore projects <Icon name="arrow"/></Link></div>
        <div className="project-grid-v3">{featuredProjects.map(p=><ProjectCard key={p.slug} item={p}/>)}</div>
      </div>
    </section>

    <section className="section-v3 process-section-v3">
      <div className="container process-panel-v3">
        <div className="process-intro"><span className="kicker">How we work</span><h2>A clear engineering path from requirement to support.</h2><p>Every project should move through a visible, accountable process.</p></div>
        <div className="process-steps-v3">{[
          ['01','Consultation','Understand the requirement, operating problem and project priorities.'],
          ['02','Site Survey','Review load, space, existing systems and technical constraints.'],
          ['03','Design & Proposal','Prepare sizing, scope, equipment selection and commercial proposal.'],
          ['04','Installation','Coordinate delivery, site work, integration and safety controls.'],
          ['05','Commissioning','Test performance, complete handover and operating checks.'],
          ['06','Maintenance','Plan preventive service, repair support and future upgrades.'],
        ].map(([n,t,d])=><div key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}</div>
      </div>
    </section>

    <section className="section-v3 trust-section-v3">
      <div className="container trust-grid-v3">
        <div><span className="kicker kicker-light">Who we support</span><h2>Built for facilities that cannot afford unreliable engineering.</h2><p>Green X supports industrial, commercial, residential and infrastructure requirements with project-focused engineering and responsive technical support.</p></div>
        <ClientShowcase clients={clients}/>
      </div>
    </section>

    <section id="quote" className="section-v3 quote-section-v3">
      <div className="container quote-layout-v3">
        <div className="quote-copy-v3"><span className="kicker">Project enquiry</span><h2>Tell us the requirement. We’ll help define the next technical step.</h2><p>Use the quick builder for solar, generator, lift, electrical, protection or maintenance requirements.</p><div className="quote-direct"><span><Icon name="phone"/><div><small>Direct phone</small><b>{settings.phone || 'Contact Green X'}</b></div></span><span><Icon name="location"/><div><small>Head office</small><b>Mirpur, Dhaka</b></div></span></div></div>
        <QuoteForm/>
      </div>
    </section>
  </>;
}
