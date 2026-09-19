import Link from 'next/link';

export const metadata = {
  title: 'Services | Threshold Technologies',
  description:
    'Commercial services available from Threshold and MEL: technical review, BIM, cost engineering, infrastructure, digital engineering and R&D.',
};

const services = [
  {
    no: '01',
    title: 'Technical Review & Audit',
    desc: 'Independent technical review, compliance audit, constructability review and digital assurance for projects and organisations.',
    detail: 'Engineering Technical Audit · BIM Audit · Commercial Audit · Compliance Audit · Constructability & Risk Review · Digital Assurance',
  },
  {
    no: '02',
    title: 'BIM & Digital Engineering',
    desc: 'Model intelligence, information management, structured digital delivery and BIM-enabled workflows.',
    detail: 'BIM modelling · Coordination · Information management · ISO 19650-aware delivery · Digital workflows',
  },
  {
    no: '03',
    title: 'Commercial / Cost Engineering',
    desc: '5D BIM, quantity intelligence, cost planning, commercial control and reporting.',
    detail: 'Cost planning · BOQ validation · Quantity intelligence · Commercial reporting · Variation control',
  },
  {
    no: '04',
    title: 'Infrastructure / Asset Assessment',
    desc: 'Infrastructure assessment, asset engineering and operational data intelligence.',
    detail: 'Asset assessment · Infrastructure review · Operational data · Digital asset intelligence',
  },
  {
    no: '05',
    title: 'Digital Engineering / Automation',
    desc: 'Custom AI plugins, automation tools and digital workflows deployed into live engineering and commercial environments.',
    detail: 'AI plugins · Workflow automation · Data pipelines · Decision-support systems',
  },
  {
    no: '06',
    title: 'Research / Prototype / Technical Development',
    desc: 'Applied research, prototyping and technology development for engineering problems.',
    detail: 'Problem research · Prototyping · Method development · Technology validation',
  },
];

export default function ServicesPage() {
  return (
    <main>
      <section className="hero">
        <div className="wrap">
          <p className="kicker">Services</p>
          <h1>What you can engage Threshold for today.</h1>
          <p>
            These are the commercial service categories available from Threshold and MEL. Each can
            be engaged as a standalone engagement or combined into a broader delivery package.
          </p>
          <div className="cta-row">
            <Link className="btn btn--primary" href="/contact">
              Discuss a project <span className="arrow">→</span>
            </Link>
            <Link className="btn btn--ghost" href="/mel">
              About MEL
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICE LIST */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker">Service categories</p>
            <h2>Six routes to engagement.</h2>
          </div>
          <div className="cap-list">
            {services.map((service) => (
              <div key={service.no} className="cap-row">
                <span className="cap-row__code">{service.no}</span>
                <div>
                  <span className="cap-row__name">{service.title}</span>
                  <p className="cap-row__desc" style={{ marginTop: 8 }}>{service.desc}</p>
                  <p style={{ marginTop: 10, fontSize: '0.82rem', color: 'var(--text-faint)', fontFamily: 'var(--mono)' }}>
                    {service.detail}
                  </p>
                </div>
                <span className="cap-row__desc"></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--tight section--quiet">
        <div className="wrap">
          <p className="kicker">Engage</p>
          <p className="statement">
            Not sure which service fits? <em>Start with a conversation</em> and we will route you
            to the right part of the ecosystem.
          </p>
          <div className="cta-row" style={{ marginTop: 32 }}>
            <Link className="btn btn--primary" href="/contact">
              Contact Threshold <span className="arrow">→</span>
            </Link>
            <Link className="btn btn--ghost" href="/products">
              View products
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
