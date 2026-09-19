import Link from 'next/link';

export const metadata = {
  title: 'MEL — Modern Engineering Lab | Threshold Technologies',
  description:
    'MEL is the engineering, digital engineering, commercial, technical review, infrastructure, research and product-development arm of Threshold Technologies.',
};

const capabilities = [
  ['01', 'Engineering & Technical Services', 'Core engineering capability across civil, structural, infrastructure and built-environment delivery.'],
  ['02', 'Technical Review & Audit', 'Independent technical review, compliance audit, constructability review and digital assurance for projects and organisations.'],
  ['03', 'BIM & Digital Engineering', 'Model intelligence, information management, structured digital delivery and BIM-enabled workflows.'],
  ['04', 'Commercial & Cost Engineering', '5D BIM, quantity intelligence, cost planning, commercial control and reporting.'],
  ['05', 'Infrastructure & Asset Engineering', 'Infrastructure assessment, asset engineering and operational data intelligence.'],
  ['06', 'Engineering Technology & R&D', 'Applied research, prototyping, automation and technology development for engineering problems.'],
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

export default function MELPage() {
  return (
    <main>
      <section className="hero">
        <div className="wrap">
          <p className="kicker">Threshold Technologies · Engineering Arm</p>
          <h1>Modern Engineering Lab</h1>
          <p>
            MEL is the engineering, digital engineering, commercial, technical review,
            infrastructure, research and product-development arm of Threshold Technologies. It
            connects engineering knowledge with software, AI, data and applied research to solve
            real industry problems.
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
      </section>

      {/* PURPOSE */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker">Purpose</p>
            <h2>Engineering capability with a research mindset.</h2>
            <p className="lede">
              MEL is not a conventional architectural, structural or MEP design consultancy. It is
              a broad engineering and technology practice that investigates problems, develops
              methods and prototypes, and turns validated ideas into services, systems or
              products. MEL may assemble specialist delivery capability around project
              requirements.
            </p>
          </div>
        </div>
      </section>

      {/* CAPABILITY GROUPS */}
      <section className="section section--quiet">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker">Capability groups</p>
            <h2>Six areas of engineering and technology practice.</h2>
          </div>
          <div className="cap-list">
            {capabilities.map(([code, name, desc]) => (
              <div key={code} className="cap-row">
                <span className="cap-row__code">{code}</span>
                <span className="cap-row__name">{name}</span>
                <span className="cap-row__desc">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNICAL REVIEW & AUDIT — progressive disclosure */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker">Technical Review & Audit</p>
            <h2>Independent review across six audit types.</h2>
            <p className="lede">
              The strongest commercial audit capability within MEL — structured, actionable and
              standards-aware.
            </p>
          </div>
          <div className="audit-list">
            {auditTypes.map(([label, desc]) => (
              <div key={label} className="audit-item">
                <span className="audit-item__label">{label}</span>
                <span className="audit-item__desc">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUDIT WORKFLOW */}
      <section className="section section--quiet">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker">Audit workflow</p>
            <h2>Receive → Review → Diagnose → Report → Verify</h2>
          </div>
          <div className="workflow">
            {auditWorkflow.map(([no, title, desc]) => (
              <div key={no} className="workflow-step">
                <span className="workflow-step__no">{no}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEL-WIDE WORKFLOW */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker">MEL-wide workflow</p>
            <h2>Define → Study → Review → Develop → Verify</h2>
            <p className="lede">
              The same disciplined approach applies across all MEL capability groups — from
              engineering services to research and product development.
            </p>
          </div>
          <div className="workflow">
            {melWorkflow.map(([no, title, desc]) => (
              <div key={no} className="workflow-step">
                <span className="workflow-step__no">{no}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ECOSYSTEM CONNECTION */}
      <section className="section section--tight section--quiet">
        <div className="wrap">
          <p className="kicker">Part of one ecosystem</p>
          <p className="statement">
            MEL develops engineering knowledge. Threshold provides the technology platform.{' '}
            <em>THS Studio</em> turns validated ideas into digital products and market-ready
            experiences.
          </p>
          <div className="cta-row" style={{ marginTop: 32 }}>
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
