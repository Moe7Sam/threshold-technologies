import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Threshold | Digital Infrastructure for Construction',
  description: 'Threshold Technologies builds digital infrastructure for construction intelligence.',
};

const products = [
  { name: 'DiSam', type: 'BIM 5D & BOQ Automation', status: 'In development', description: 'Turning BIM models into commercially ready assets for quantities, BOQ structure, cost data, and commercial intelligence.' },
  { name: 'SiteReport AI', type: 'AI-Assisted Site Reporting', status: 'In development', description: 'Converting site observations, photos, progress information, and reporting workflows into structured professional reports.' },
  { name: 'Threshold Academy', type: 'Digital Construction Learning Platform', status: 'In development', description: 'Building practical capability in digital construction, commercial intelligence, QS, BIM, and AI-assisted workflows.' },
  { name: 'Coming Soon', type: 'Future Construction Intelligence Software', status: 'Coming soon', description: 'A future software product that will expand the Threshold ecosystem.' },
];

export default function Home() {
  return <main className="threshold-home">
    <section id="about" className="threshold-hero">
      <div className="threshold-hero__grid" aria-hidden="true" />
      <div className="threshold-hero__copy">
        <p className="threshold-label">Threshold Technologies / Construction systems</p>
        <h1>Building Digital Infrastructure <em>for Construction</em></h1>
        <p>Threshold Technologies develops digital systems that connect construction data, BIM models, commercial intelligence, and AI-assisted workflows.</p>
        <div className="threshold-actions">
          <Link href="#products" className="threshold-button threshold-button--primary">Explore Product Lab</Link>
          <Link href="#contact" className="threshold-button">Build With Threshold</Link>
        </div>
      </div>
      <div className="threshold-index" aria-label="Threshold system index">
        <span>System index</span><strong>01â€”04</strong><p>BIM Â· Commercial intelligence Â· Site reporting Â· AI-assisted delivery</p>
      </div>
    </section>

    <section id="vision" className="threshold-vision">
      <div><p className="threshold-label">01 / Vision</p><h2>From Construction Data to <em>Construction Intelligence</em></h2></div>
      <div className="vision-panel"><span className="vision-panel__line" aria-hidden="true" /><p>Our vision is to create the digital layer that allows project teams to structure, measure, report, control, and understand construction information with greater accuracy.</p><ul><li>Structured workflows</li><li>Model readiness</li><li>Measured delivery</li></ul></div>
    </section>

    <section id="products" className="product-lab">
      <div className="product-lab__heading"><div><p className="threshold-label">02 / Product Lab</p><h2>The Threshold <em>Product Lab</em></h2></div><p>Systems under engineering for the digital construction environment.</p></div>
      <div className="lab-grid" aria-hidden="true" />
      <div className="product-pods">
        {products.map((product, index) => <article className="product-pod" key={product.name}>
          <div className="product-pod__top"><span>Product {String(index + 1).padStart(2, '0')}</span><b>{product.status}</b></div>
          <div className="product-pod__signal" aria-hidden="true"><i /><i /><i /></div>
          <div><small>{product.type}</small><h3>{product.name}</h3><p>{product.description}</p></div>
        </article>)}
      </div>
    </section>

    <section id="contact" className="threshold-contact">
      <div><p className="threshold-label">03 / Contact</p><h2>Build With <em>Threshold</em></h2></div>
      <div><p>For partnerships, investment, pilots, and collaboration, contact Threshold Technologies.</p><a className="threshold-button threshold-button--primary" href="mailto:info@threshold-technologies.com">Contact Threshold <span>â†’</span></a></div>
    </section>
  </main>;
}

