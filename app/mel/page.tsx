import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'MEL — Modern Engineering Lab | Threshold Technologies',
  description: 'Modern Engineering Lab is the engineering, technology and research arm of Threshold Technologies Holdings.',
};

const disciplines = [
  ['01', 'Digital Engineering & BIM', 'Model intelligence, information management and structured digital delivery.'],
  ['02', 'AI & Automation', 'Applied AI, workflow automation and decision-support systems for engineering.'],
  ['03', 'Cost & Commercial Engineering', '5D BIM, quantity intelligence, cost planning and commercial control.'],
  ['04', 'Computational Design', 'Parametric, rule-based and data-informed design exploration.'],
  ['05', 'Data & Digital Twins', 'Connected project information, operational data and digital asset intelligence.'],
  ['06', 'Research & Development', 'Industry problems translated into experiments, prototypes and applied research.'],
];

export default function MELPage() {
  return (
    <main>
      <section className="hero"><div className="wrap">
        <div className="symbol-hero" style={{ marginBottom: '28px' }}>
          <Image 
            src="/brand/mel/symbol.png" 
            alt="MEL — Modern Engineering Lab" 
            width={120} 
            height={120}
            priority
            style={{ width: '120px', height: 'auto' }}
          />
        </div>
        <p className="eyebrow">Threshold Technologies Holdings · Engineering Arm</p>
        <h1>Modern Engineering Lab</h1>
        <p>ENGINEERING × TECHNOLOGY × RESEARCH</p>
        <p>MEL connects engineering knowledge with software, AI, data and applied research to solve real industry problems and develop new delivery methods.</p>
        <div className="cta-row"><Link className="btn btn--primary" href="/contact">Collaborate with MEL <span className="arrow">→</span></Link><Link className="btn btn--ghost" href="/studio">Explore THS Studio</Link></div>
      </div></section>

      <section className="section"><div className="wrap"><div className="head">
        <p className="eyebrow">Purpose</p><h2>Engineering capability with a research mindset.</h2>
        <p className="lede">MEL is the technical and research branch of Threshold. It investigates engineering problems, develops methods and prototypes, and turns validated ideas into services, systems or products.</p>
      </div></div></section>

      <section className="section section--tight"><div className="wrap"><div className="head"><p className="eyebrow">Core disciplines</p><h2>Multidisciplinary by design.</h2></div>
        <div className="grid grid--3">{disciplines.map(([n,title,copy]) => <article className="card" key={title}><span className="card__tag">{n}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </div></section>

      <section className="section"><div className="wrap"><div className="head"><p className="eyebrow">How MEL works</p><h2>Explore → test → validate → deliver.</h2></div>
        <div className="grid grid--3">
          <article className="card"><span className="card__tag">Explore</span><h3>Research the problem</h3><p>Understand standards, constraints, workflows, data and real project conditions.</p></article>
          <article className="card"><span className="card__tag">Validate</span><h3>Build and test</h3><p>Prototype technical approaches and test them against engineering requirements.</p></article>
          <article className="card"><span className="card__tag">Deliver</span><h3>Move into practice</h3><p>Validated work moves into engineering delivery, Threshold systems or THS Studio products.</p></article>
        </div>
      </div></section>

      <section className="section section--tight"><div className="wrap"><p className="eyebrow">Part of one ecosystem</p><p className="statement">MEL develops engineering knowledge. Threshold provides the technology platform. THS Studio turns validated ideas into digital products and market-ready experiences.</p><div className="cta-row"><Link className="btn btn--primary" href="/studio">Go to THS Studio <span className="arrow">→</span></Link><Link className="btn btn--ghost" href="/">Back to Threshold</Link></div></div></section>
    </main>
  );
}
