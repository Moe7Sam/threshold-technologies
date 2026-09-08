import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'THS Studio | Threshold Technologies',
  description: 'THS Studio is the digital product, experience and commercialisation studio of Threshold Technologies Holdings.',
};

const products = [
  ['AIO', 'Adopt · Integrate · Own', 'Vendor-neutral BIM intelligence for review, control and execution workflows.'],
  ['DiSam', 'Commercial BIM readiness', 'Structured BIM-to-5D mapping and commercial readiness for quantity and cost workflows.'],
  ['SiteReport AI', 'Field reporting', 'Structured site reporting from photos, voice notes, evidence and controlled PDF outputs.'],
  ['Threshold Gate', 'Built-environment concept', 'A technology-led architecture and infrastructure programme developed within the Threshold ecosystem.'],
];

export default function StudioPage() {
  return (
    <main>
      <section className="hero"><div className="wrap">
        <div className="symbol-hero" style={{ marginBottom: '28px' }}>
          <Image 
            src="/brand/ths-studio/symbol.png" 
            alt="THS Studio — Digital Products Studio" 
            width={120} 
            height={120}
            priority
            style={{ width: '120px', height: 'auto' }}
          />
        </div>
        <p className="eyebrow">Threshold Technologies Holdings · Digital Product Studio</p>
        <h1>THS Studio</h1>
        <p>Digital products, presentation, commercialization and customer experience.</p>
        <p>THS Studio turns validated ideas, engineering intelligence and software concepts into clear digital products, market-facing experiences and customer-ready platforms.</p>
        <div className="cta-row"><Link className="btn btn--primary" href="/contact">Work With THS Studio <span className="arrow">→</span></Link><Link className="btn btn--ghost" href="/mel">Explore MEL</Link></div>
      </div></section>

      <section className="section"><div className="wrap"><div className="head">
        <p className="eyebrow">Role within Threshold</p><h2>From validated idea to usable product.</h2>
        <p className="lede">THS Studio is the product and commercialisation layer of the Threshold ecosystem. It focuses on product identity, user experience, demonstrations, landing pages, customer journeys and the path from internal prototype to real market use.</p>
      </div></div></section>

      <section className="section section--tight"><div className="wrap"><div className="head"><p className="eyebrow">Product portfolio</p><h2>Four products in focus.</h2><p className="lede">The current public product portfolio is intentionally focused on AIO, DiSam, SiteReport AI and Threshold Gate.</p></div>
        <div className="grid grid--3">{products.map(([name,title,copy]) => <article className="card" key={name}><span className="card__tag">{name}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </div></section>

      <section className="section"><div className="wrap"><div className="head"><p className="eyebrow">Studio workflow</p><h2>Shape → present → validate → launch.</h2></div>
        <div className="grid grid--3">
          <article className="card"><span className="card__tag">01</span><h3>Product definition</h3><p>Clarify the problem, audience, value proposition and product boundaries.</p></article>
          <article className="card"><span className="card__tag">02</span><h3>Experience & identity</h3><p>Create the interface direction, landing experience, demonstration and communication layer.</p></article>
          <article className="card"><span className="card__tag">03</span><h3>Commercial readiness</h3><p>Prepare the product for customer review, pilot engagement, partnerships and controlled release.</p></article>
        </div>
      </div></section>

      <section className="section section--tight"><div className="wrap"><p className="eyebrow">One connected system</p><p className="statement">Threshold provides the technology platform. MEL provides engineering and research depth. THS Studio packages validated work into products people can understand, test and adopt.</p><div className="cta-row"><Link className="btn btn--primary" href="/contact">Start a conversation <span className="arrow">→</span></Link><Link className="btn btn--ghost" href="/">Back to Threshold</Link></div></div></section>
    </main>
  );
}
