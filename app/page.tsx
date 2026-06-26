import Link from 'next/link';
import RevealController from '@/components/home/RevealController';
import { VisionFlow, ArtDiSam, ArtSiteReport, ArtAcademy, ArtAI } from '@/components/home/art';

// TODO: provide the real business contact details — these are placeholders.
const CONTACT_EMAIL = 'REPLACE_WITH_EMAIL';          // e.g. info@threshold-technologies.com
const WHATSAPP_NUMBER = 'REPLACE_WITH_NUMBER';       // intl format, digits only, e.g. 9715XXXXXXXX

const sectors = ['Construction', 'Transportation', 'Management', 'Finance', 'Digital Products'];

const services = [
  { code: 'BIM', name: 'BIM & Construction Solutions', statement: 'BIM modeling, coordination, and construction delivery built on structured digital workflows.' },
  { code: 'COST', name: 'Cost Management, Estimation & Supervision', statement: 'Estimation, commercial control, and site supervision — measured, structured, and data-driven.' },
  { code: 'AI', name: 'AI Plugins & Tools', statement: 'Custom AI plugins and automation tools deployed into live engineering and commercial workflows.' },
  { code: 'EDU', name: 'BIM Academy', statement: 'Practical training in BIM, digital delivery, and AI-assisted workflows for working teams.' },
  { code: 'DEV', name: 'Business Development Consultation', statement: 'Advisory that moves organizations from traditional processes into structured digital operations.' },
];

const products = [
  { no: '01', name: 'Engineering Design Suite', tagline: 'Design Software Solutions & Plugins', art: <ArtDiSam />, desc: 'Software and plugins that extend engineering design tools with structured, model-based automation.' },
  { no: '02', name: 'Management & Reporting', tagline: 'Reporting Software Solutions', art: <ArtSiteReport />, desc: 'Systems that turn operational information and progress data into structured professional reports.' },
  { no: '03', name: 'SaaS Platforms', tagline: 'SaaS Software Business Models', art: <ArtAcademy />, desc: 'Cloud software products delivered as subscription platforms across multiple business sectors.' },
  { no: '04', name: 'AI Commercial Tools', tagline: 'AI Commercial Support Tools', art: <ArtAI />, desc: 'AI tools that support commercial decisions, estimation, and reporting across project delivery.' },
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
            Building Digital <span className="th-mark">Solutions</span> for Business
          </h1>
          <p className="th-hero-copy" data-reveal>
            Threshold Technologies develops digital systems and software across multiple sectors —
            connecting data, engineering, commercial intelligence, and AI-assisted workflows.
          </p>
          <div className="th-actions" data-reveal>
            <Link href="#contact" className="btn btn-primary">Build With Threshold</Link>
            <Link href="#products" className="btn">View the Product Lab</Link>
          </div>
          <div className="th-hero-tags" data-reveal>
            {sectors.map((s) => (
              <span key={s}><b>//</b> {s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* §12 Vision — Integrating AI ------------------------------------- */}
      <section id="vision" className="th-section th-vision">
        <div className="th-inner">
          <div className="th-section-head">
            <p className="th-eyebrow" data-reveal>// Vision</p>
            <h2 data-reveal>Integrating AI Across Every Sector</h2>
            <p className="th-intro" data-reveal>
              Our vision is to integrate AI into the core of how businesses operate — embedding
              intelligent automation into data, engineering, commercial, and management workflows so
              teams decide and deliver with greater accuracy.
            </p>
          </div>
          <div className="th-panel" data-reveal>
            <span className="th-grid" aria-hidden="true" />
            <div className="th-flow">
              <VisionFlow />
              <p className="th-flow-caption">Information crossing the threshold — from raw data, through AI, into intelligence</p>
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
              Engagements that move organizations from traditional workflows into structured digital delivery.
            </p>
          </div>
          <div className="th-capabilities">
            {services.map((c) => (
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
              Software built in-house — turning information into structured, commercially ready intelligence.
            </p>
          </div>
          <div className="th-pods">
            {products.map((p) => (
              <article className="th-pod" key={p.no} data-reveal>
                <span className="th-grid" aria-hidden="true" />
                <div className="th-pod-head">
                  <span className="th-pod-no">{p.no}</span>
                  <span className="th-pod-name">{p.name}</span>
                  <span className="th-badge">STATUS: IN_DEVELOPMENT</span>
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
          </div>
        </div>
      </section>

      {/* Partners ------------------------------------------------------- */}
      <section id="partners" className="th-section th-partners">
        <div className="th-inner">
          <div className="th-section-head">
            <p className="th-eyebrow" data-reveal>// Partners</p>
            <h2 data-reveal>Strategic Partners</h2>
            <p className="th-intro" data-reveal>
              Threshold works alongside selected partners to deliver across sectors.
            </p>
          </div>
          <div className="th-partner" data-reveal>
            <div className="th-partner-mark" aria-hidden="true">ROA</div>
            <div className="th-partner-body">
              <h3>ROA Consultancy</h3>
              <p className="th-partner-role">Managed by Ammar — Co-founder of Threshold</p>
              <p className="th-partner-desc">
                A strategic consultancy partner of Threshold Technologies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* §15 Contact ---------------------------------------------------- */}
      <section id="contact" className="th-section th-contact">
        <div className="th-inner">
          <div className="th-contact-card" data-reveal>
            <p className="th-eyebrow">// Contact</p>
            <h2>Build With Threshold</h2>
            <p>For partnerships, investment, pilots, and collaboration, reach Threshold Technologies by email or WhatsApp.</p>
            <div className="th-actions">
              <a href={`mailto:${CONTACT_EMAIL}`} className="btn btn-primary">Email Threshold</a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                className="btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
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
