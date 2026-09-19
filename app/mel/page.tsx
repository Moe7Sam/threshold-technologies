import Link from 'next/link';
import EvidenceLayer from '@/components/mel/EvidenceLayer';

export const metadata = {
  title: 'MEL — Modern Engineering Lab | Threshold Technologies',
  description:
    'MEL is the engineering, digital engineering, commercial, technical review, infrastructure, research and product-development arm of Threshold Technologies.',
};

const capabilities = [
  ['01', 'Engineering & Technical Services', 'Core engineering capability across civil, structural, infrastructure and built-environment delivery.', 'Technical geometry, requirements and engineering judgement.'],
  ['02', 'Technical Review & Audit', 'Independent technical review, compliance audit, constructability review and digital assurance for projects and organisations.', 'Issue-led review, traceable findings and verified actions.'],
  ['03', 'BIM & Digital Engineering', 'Model intelligence, information management, structured digital delivery and BIM-enabled workflows.', 'Model states, data layers and information readiness.'],
  ['04', 'Commercial & Cost Engineering', '5D BIM, quantity intelligence, cost planning, commercial control and reporting.', 'Quantities, classification and commercial decision support.'],
  ['05', 'Infrastructure & Asset Engineering', 'Infrastructure assessment, asset engineering and operational data intelligence.', 'Inspection evidence, asset context and lifecycle insight.'],
  ['06', 'Engineering Technology & R&D', 'Applied research, prototyping, automation and technology development for engineering problems.', 'Prototype methods, automation and applied research.'],
];

const auditTypes = [
  ['Engineering Technical Audit', 'Technical review of engineering deliverables, design packages and documentation.'],
  ['BIM Audit', 'Model quality, information readiness, classification and ISO 19650-aware workflow review.'],
  ['Commercial Audit', 'Cost plan review, BOQ validation, commercial readiness and reporting assessment.'],
  ['Compliance Audit', 'Standards compliance, regulatory alignment and documentation control review.'],
  ['Constructability & Risk Review', 'Constructability assessment, risk identification and delivery-readiness review.'],
  ['Digital Assurance', 'Digital delivery assurance, data quality and workflow integrity review.'],
];

const auditWorkflow = [
  ['01', 'Receive', 'Accept the scope, documentation and project context.'],
  ['02', 'Review', 'Examine deliverables against standards, requirements and best practice.'],
  ['03', 'Diagnose', 'Identify gaps, risks, inconsistencies and areas for improvement.'],
  ['04', 'Report', 'Produce a structured, actionable findings report.'],
  ['05', 'Verify', 'Confirm that recommended actions have been implemented.'],
];

const melWorkflow = [
  ['01', 'Define', 'Clarify the problem, scope, constraints and objectives.'],
  ['02', 'Study', 'Research standards, workflows, data and real project conditions.'],
  ['03', 'Review', 'Assess existing approaches, identify gaps and opportunities.'],
  ['04', 'Develop', 'Prototype methods, tools and validated technical approaches.'],
  ['05', 'Verify', 'Test against requirements and move validated work into delivery.'],
];

function LabDiagram() {
  return (
    <div className="lab-diagram" aria-label="MEL connects technical review, digital models, commercial intelligence and research">
      <div className="lab-diagram__meta"><span>Lab model / MEL.01</span><span>Live method</span></div>
      <svg viewBox="0 0 680 390" role="img" aria-labelledby="lab-diagram-title lab-diagram-desc">
        <title id="lab-diagram-title">Modern Engineering Lab technical method diagram</title>
        <desc id="lab-diagram-desc">A central MEL node connects engineering, audit, BIM, commercial, infrastructure and research capability.</desc>
        <g className="lab-diagram__grid">
          {Array.from({ length: 8 }, (_, index) => <line key={`v-${index}`} x1={80 + index * 75} y1="35" x2={80 + index * 75} y2="355" />)}
          {Array.from({ length: 5 }, (_, index) => <line key={`h-${index}`} x1="80" y1={75 + index * 60} x2="605" y2={75 + index * 60} />)}
        </g>
        <g className="lab-diagram__network">
          <line x1="340" y1="195" x2="160" y2="92" />
          <line x1="340" y1="195" x2="340" y2="72" />
          <line x1="340" y1="195" x2="520" y2="92" />
          <line x1="340" y1="195" x2="160" y2="300" />
          <line x1="340" y1="195" x2="340" y2="320" />
          <line x1="340" y1="195" x2="520" y2="300" />
        </g>
        <circle className="lab-diagram__core" cx="340" cy="195" r="62" />
        {[[160, 92], [340, 72], [520, 92], [160, 300], [340, 320], [520, 300]].map(([cx, cy], index) => (
          <circle className="lab-diagram__node" cx={cx} cy={cy} r="20" key={index} />
        ))}
        <text className="lab-diagram__core-label" x="340" y="190" textAnchor="middle">MEL</text>
        <text className="lab-diagram__sub-label" x="340" y="211" textAnchor="middle">METHOD</text>
        <text className="lab-diagram__label" x="160" y="50" textAnchor="middle">ENGINEERING</text>
        <text className="lab-diagram__label" x="340" y="36" textAnchor="middle">AUDIT</text>
        <text className="lab-diagram__label" x="520" y="50" textAnchor="middle">BIM / DATA</text>
        <text className="lab-diagram__label" x="160" y="347" textAnchor="middle">COMMERCIAL</text>
        <text className="lab-diagram__label" x="340" y="375" textAnchor="middle">INFRASTRUCTURE</text>
        <text className="lab-diagram__label" x="520" y="347" textAnchor="middle">R&D</text>
      </svg>
    </div>
  );
}

export default function MELPage() {
  return (
    <main>
      <section className="mel-hero">
        <div className="wrap mel-hero__layout">
          <div className="mel-hero__content">
            <p className="kicker">Threshold Technologies · Engineering Arm</p>
            <h1>Modern Engineering Lab</h1>
            <p>
              MEL connects engineering knowledge with software, AI, data and applied research
              to solve real industry problems.
            </p>
            <div className="cta-row">
              <Link className="btn btn--primary" href="/contact">
                Collaborate with MEL <span className="arrow">→</span>
              </Link>
              <Link className="btn btn--ghost" href="/services">
                View services
              </Link>
            </div>
          </div>
          <LabDiagram />
        </div>
      </section>

      <section className="section mel-purpose">
        <div className="wrap mel-purpose__layout">
          <p className="kicker">Purpose</p>
          <p className="statement">
            Engineering capability with a <em>research mindset.</em>
          </p>
          <p className="lede">
            MEL is not a conventional architectural, structural or MEP design consultancy. It is
            a broad engineering and technology practice that investigates problems, develops
            methods and prototypes, and turns validated ideas into services, systems or products.
            MEL may assemble specialist delivery capability around project requirements.
          </p>
        </div>
      </section>

      <section className="section section--quiet mel-capabilities">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker">Capability groups</p>
            <h2>Six connected areas of practice.</h2>
            <p className="lede">Open a capability to see the method and evidence it brings into the wider MEL system.</p>
          </div>
          <div className="capability-index">
            {capabilities.map(([code, name, desc, proof]) => (
              <details className="capability-index__item" key={code}>
                <summary>
                  <span className="capability-index__code">{code}</span>
                  <span className="capability-index__name">{name}</span>
                  <span className="capability-index__toggle" aria-hidden="true">+</span>
                </summary>
                <div className="capability-index__detail">
                  <p>{desc}</p>
                  <p><b>Technical focus</b>{proof}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <EvidenceLayer />

      <section className="section audit-section">
        <div className="wrap audit-section__layout">
          <div className="section-head">
            <p className="kicker">Technical Review & Audit</p>
            <h2>Independent review, made traceable.</h2>
            <p className="lede">
              A strong commercial capability within MEL: structured, actionable and standards-aware
              without defining the whole practice.
            </p>
          </div>
          <div className="audit-panel">
            <p className="audit-panel__eyebrow">Review coverage / select a discipline</p>
            {auditTypes.map(([label, desc], index) => (
              <details key={label} className="audit-panel__item" open={index === 0}>
                <summary><span>{`0${index + 1}`}</span>{label}<b aria-hidden="true">+</b></summary>
                <p>{desc}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--quiet method-section">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker">Audit workflow</p>
            <h2>Receive → Review → Diagnose → Report → Verify</h2>
          </div>
          <div className="method-rail">
            {auditWorkflow.map(([no, title, desc]) => (
              <article key={no} className="method-rail__step">
                <span>{no}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section mel-method">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker">MEL-wide workflow</p>
            <h2>Define → Study → Review → Develop → Verify</h2>
            <p className="lede">
              The same disciplined approach applies across every capability group, from
              engineering services to research and product development.
            </p>
          </div>
          <ol className="mel-method__steps">
            {melWorkflow.map(([no, title, desc]) => (
              <li key={no}>
                <span>{no}</span>
                <div><h3>{title}</h3><p>{desc}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--tight section--quiet">
        <div className="wrap final-callout">
          <p className="kicker">Part of one ecosystem</p>
          <p className="statement">
            MEL develops engineering knowledge. Threshold provides the technology platform.
            <em> THS Studio</em> turns validated ideas into digital products and market-ready experiences.
          </p>
          <div className="cta-row">
            <Link className="btn btn--primary" href="/studio">
              Go to THS Studio <span className="arrow">→</span>
            </Link>
            <Link className="btn btn--ghost" href="/">
              Back to Threshold
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
