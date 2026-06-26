import Link from 'next/link';
import RevealController from '@/components/home/RevealController';
import { VisionFlow, ArtDiSam, ArtSiteReport, ArtAcademy, ArtLocked } from '@/components/home/art';

const capabilities = [
  { code: 'BIM', name: 'BIM 5D & Model Readiness', statement: 'Structuring and preparing BIM models for commercial use — quantities, BOQ structure, and model-based cost data.' },
  { code: 'QS', name: 'Commercial Intelligence', statement: 'Digitizing QS and commercial workflows: measurement, BOQ, cost data, and structured commercial control.' },
  { code: 'AI', name: 'AI-Assisted Delivery', statement: 'Deploying AI reporting and workflow systems into live project delivery.' },
  { code: 'DLV', name: 'Digital Infrastructure Consulting', statement: 'Moving teams from traditional processes to structured, data-driven digital delivery.' },
];

const products = [
  { no: '01', name: 'DiSam', tagline: 'BIM 5D & BOQ Automation', status: 'IN_DEVELOPMENT', art: <ArtDiSam />, desc: 'Turning BIM models into commercially ready assets for quantities, BOQ structure, cost data, and commercial intelligence.' },
  { no: '02', name: 'SiteReport AI', tagline: 'AI-Assisted Site Reporting', status: 'IN_DEVELOPMENT', art: <ArtSiteReport />, desc: 'Converting site observations, photos, progress information, and reporting workflows into structured professional reports.' },
  { no: '03', name: 'Threshold Academy', tagline: 'Digital Construction Learning Platform', status: 'IN_DEVELOPMENT', art: <ArtAcademy />, desc: 'Building practical capability in digital construction, commercial intelligence, QS, BIM, and AI-assisted workflows.' },
];

export default function Home() {
  return (
    <main className="th-main">
      <RevealController />

      {/* §11 About / hero ------------------------------------------------ */}
      <section id="about" className="th-hero">
        <span className="th-grid" aria-hidden="true" />
        <div className="th-inner">
          <p className="th-eyebrow th-hero-eyebrow" data-reveal>// Threshold Technologies</p>
          <h1 data-reveal>
            Building Digital Infrastructure for <span className="th-mark">Construction</span>
          </h1>
          <p className="th-hero-copy" data-reveal>
            Threshold Technologies develops digital systems that connect construction data, BIM
            models, commercial intelligence, and AI-assisted workflows.
          </p>
          <div className="th-actions" data-reveal>
            <Link href="#contact" className="btn btn-primary">Build With Threshold</Link>
            <Link href="#products" className="btn">View the Product Lab</Link>
          </div>
          <div className="th-hero-tags" data-reveal>
            <span><b>//</b> Digital Infrastructure</span>
            <span><b>//</b> BIM 5D</span>
            <span><b>//</b> Commercial Intelligence</span>
            <span><b>//</b> AI-Assisted Delivery</span>
          </div>
        </div>
      </section>

      {/* §12 Vision ------------------------------------------------------ */}
      <section id="vision" className="th-section th-vision">
        <div className="th-inner">
          <div className="th-section-head">
            <p className="th-eyebrow" data-reveal>// Vision</p>
            <h2 data-reveal>From Construction Data to Construction Intelligence</h2>
            <p className="th-intro" data-reveal>
              Our vision is to create the digital layer that lets project teams structure, measure,
              report, control, and understand construction information with greater accuracy.
            </p>
          </div>
          <div className="th-panel" data-reveal>
            <span className="th-grid" aria-hidden="true" />
            <div className="th-flow">
              <VisionFlow />
              <p className="th-flow-caption">System connection — information crossing the threshold into intelligence</p>
            </div>
          </div>
        </div>
      </section>

      {/* §13 Services — indexed capabilities ----------------------------- */}
      <section id="services" className="th-section th-services">
        <div className="th-inner">
          <div className="th-section-head">
            <p className="th-eyebrow" data-reveal>// Capabilities</p>
            <h2 data-reveal>What Threshold Delivers</h2>
            <p className="th-intro" data-reveal>
              Engagements that move project teams from traditional workflows into structured digital delivery.
            </p>
          </div>
          <div className="th-capabilities">
            {capabilities.map((c) => (
              <div className="th-cap" key={c.code}>
                <span className="th-cap-code">{c.code}</span>
                <span className="th-cap-name">{c.name}</span>
                <span className="th-cap-stmt">{c.statement}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §14 Products — the lab ----------------------------------------- */}
      <section id="products" className="th-section th-products">
        <div className="th-inner">
          <div className="th-section-head">
            <p className="th-eyebrow" data-reveal>// Product Lab</p>
            <h2 data-reveal>The Threshold Product Lab</h2>
            <p className="th-intro" data-reveal>
              Software built in-house — turning construction information into structured, commercially
              ready intelligence.
            </p>
          </div>
          <div className="th-pods">
            {products.map((p) => (
              <article className="th-pod" key={p.no} data-reveal>
                <span className="th-grid" aria-hidden="true" />
                <div className="th-pod-head">
                  <span className="th-pod-no">{p.no}</span>
                  <span className="th-pod-name">{p.name}</span>
                  <span className="th-badge">STATUS: {p.status}</span>
                </div>
                <div className="th-pod-art">{p.art}</div>
                <p className="th-pod-tagline">{p.tagline}</p>
                <p className="th-pod-desc">{p.desc}</p>
                <div className="th-pod-status">
                  <span className="th-status-bar" aria-hidden="true" />
                  <span className="th-status-label">In Development</span>
                </div>
              </article>
            ))}

            {/* locked, intentional absence */}
            <article className="th-pod is-locked" data-reveal aria-label="Coming soon — future construction intelligence software">
              <span className="th-grid" aria-hidden="true" />
              <div className="th-pod-head">
                <span className="th-pod-no">04</span>
                <span className="th-pod-name">Coming Soon</span>
                <span className="th-badge">STATUS: COMING_SOON</span>
              </div>
              <div className="th-pod-art"><ArtLocked /></div>
              <p className="th-pod-tagline">Future Construction Intelligence Software</p>
              <p className="th-pod-desc">A future software product that will expand the Threshold ecosystem.</p>
              <p className="th-lock-tag">// Awaiting Deployment</p>
            </article>
          </div>
        </div>
      </section>

      {/* §15 Contact ---------------------------------------------------- */}
      <section id="contact" className="th-section th-contact">
        <div className="th-inner">
          <div className="th-contact-card" data-reveal>
            <p className="th-eyebrow">// Contact</p>
            <h2>Build With Threshold</h2>
            <p>For partnerships, investment, pilots, and collaboration, contact Threshold Technologies.</p>
            <div className="th-actions">
              <Link href="/contact" className="btn btn-primary">Start a Conversation</Link>
              <a href="https://threshold-technologies.com" className="btn" target="_blank" rel="noopener noreferrer">
                threshold-technologies.com
              </a>
            </div>
            <div className="th-contact-meta">
              <span><b>//</b> Partnerships</span>
              <span><b>//</b> Investment</span>
              <span><b>//</b> Pilots</span>
              <span><b>//</b> Collaboration</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
