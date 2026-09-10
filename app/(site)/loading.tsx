export default function Loading(){
  return <div className="gx-page-skeleton" aria-label="Loading page" aria-busy="true">
    <div className="gx-skeleton-hero">
      <div className="container gx-skeleton-hero-grid">
        <div>
          <span className="gx-skeleton sk-pill"/>
          <span className="gx-skeleton sk-title"/>
          <span className="gx-skeleton sk-title sk-title-short"/>
          <span className="gx-skeleton sk-copy"/>
          <span className="gx-skeleton sk-copy sk-copy-short"/>
          <div className="gx-skeleton-actions"><span className="gx-skeleton"/><span className="gx-skeleton"/></div>
        </div>
        <span className="gx-skeleton sk-panel"/>
      </div>
    </div>
    <div className="container gx-skeleton-content">
      <span className="gx-skeleton sk-kicker"/>
      <span className="gx-skeleton sk-section-title"/>
      <div className="gx-skeleton-grid">{Array.from({length:6}).map((_,i)=><span key={i} className="gx-skeleton sk-card"/>)}</div>
    </div>
  </div>;
}
