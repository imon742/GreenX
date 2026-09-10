import Link from 'next/link';
import SystemEstimator from '@/components/SystemEstimator';
import Icon from '@/components/Icons';

export const metadata={title:'Estimate System Size',description:'Create an indicative solar, generator, lift or UPS system-size estimate for a Green X engineering review.'};

export default function EstimateSystemSize(){return <>
  <section className="contact-hero-v3"><div className="container"><span className="kicker kicker-light">Engineering estimator</span><h1>Estimate a practical starting size before the site survey.</h1><p>Use a few planning inputs to create an indicative solar, generator, lift or UPS requirement. Final design and commercial selection still require engineering verification.</p></div></section>
  <section className="gx-section gx-estimator-section"><div className="container gx-estimator-layout"><div className="gx-estimator-copy"><span className="kicker kicker-light">Estimate system size</span><h2>A faster first conversation with the engineering team.</h2><p>The calculator keeps the early-stage flow simple while collecting the technical context Green X needs to continue the discussion.</p><div className="gx-estimator-benefits"><span><Icon name="check"/><b>Indicative sizing</b><small>Useful for early budgeting and scope discussion.</small></span><span><Icon name="check"/><b>System-specific inputs</b><small>Questions change for solar, generator, lift and UPS.</small></span><span><Icon name="check"/><b>Engineering handoff</b><small>Submit the result directly as an enquiry.</small></span></div><Link href="/solutions" className="gx-secondary-cta gx-secondary-light">Explore all solutions</Link></div><SystemEstimator/></div></section>
</>}
