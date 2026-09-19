import Link from 'next/link';

export const metadata = {
  title: 'THS Studio | Threshold Technologies',
  description:
    'THS Studio is the commercialisation, business development, market access and client-engagement arm of Threshold Technologies.',
};

const focus = [
  ['01', 'Business Development', 'Market positioning, opportunity identification and commercial pipeline development.'],
  ['02', 'Client Acquisition', 'Client conversations, requirement scoping and engagement structuring.'],
  ['03', 'Market Engagement', 'Market presence, communication strategy and category positioning.'],
  ['04', 'Partnerships', 'Strategic collaboration across technology, construction and education sectors.'],
  ['05', 'Product Commercialisation', 'Taking validated products from prototype to market-ready, customer-facing platforms.'],
  ['06', 'Client Solutions', 'Solution design, pilot engagement and the path from interest to signed engagement.'],
];

const workflow = [
  ['01', 'Shape', 'Clarify the product, audience, value proposition and commercial boundaries.'],
  ['02', 'Present', 'Create the interface direction, landing experience and communication layer.'],
  ['03', 'Validate', 'Test with selected partners, gather feedback and refine the offer.'],
  ['04', 'Launch', 'Prepare for customer review, pilot engagement and controlled release.'],
];

export default function StudioPage() {
  return (
    <main>
      <section className="hero">
        <div className="wrap">
          <p className="kicker">Threshold Technologies · Commercial Arm</p>
          <h1>THS Studio</h1>
          <p>
            THS Studio is the commercialisation, business development, market access and
            client-engagement arm of Threshold Technologies. It turns validated engineering
            intelligence and software concepts into clear digital products, market-facing
            experiences and customer-ready platforms.
          </p>
          <div className="cta-row">
            <Link className="btn btn--primary" href="/contact">
              Work with THS Studio <span className="arrow">→</span>
            </Link>
            <Link className="btn btn--ghost" href="/products">
              View products
            </Link>
          </div>
        </div>
      </section>

      {/* ROLE */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker">Role within Threshold</p>
            <h2>From validated idea to market-ready product.</h2>
            <p className="lede">
              THS Studio is the product and commercialisation layer of the Threshold ecosystem. It
              focuses on business development, client acquisition, market engagement,
              partnerships, product commercialisation, client solutions and opportunity
              development.
            </p>
          </div>
        </div>
      </section>

      {/* FOCUS AREAS */}
      <section className="section section--quiet">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker">Focus areas</p>
            <h2>Commercially clear and deliberately simple.</h2>
          </div>
          <div className="cap-list">
            {focus.map(([code, name, desc]) => (
              <div key={code} className="cap-row">
                <span className="cap-row__code">{code}</span>
                <span className="cap-row__name">{name}</span>
                <span className="cap-row__desc">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STUDIO WORKFLOW */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker">Studio workflow</p>
            <h2>Shape → Present → Validate → Launch</h2>
          </div>
          <div className="workflow" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {workflow.map(([no, title, desc]) => (
              <div key={no} className="workflow-step">
                <span className="workflow-step__no">{no}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ECOSYSTEM */}
      <section className="section section--tight section--quiet">
        <div className="wrap">
          <p className="kicker">One connected system</p>
          <p className="statement">
            Threshold provides the technology platform. MEL provides engineering and research
            depth. <em>THS Studio</em> packages validated work into products people can
            understand, test and adopt.
          </p>
          <div className="cta-row" style={{ marginTop: 32 }}>
            <Link className="btn btn--primary" href="/contact">
              Start a conversation <span className="arrow">→</span>
            </Link>
            <Link className="btn btn--ghost" href="/mel">
              Explore MEL
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
