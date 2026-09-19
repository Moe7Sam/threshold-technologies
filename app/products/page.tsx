import Link from 'next/link';

export const metadata = {
  title: 'Products | Threshold Technologies',
  description:
    'The current Threshold product portfolio: AIO, DiSam, SiteReport AI and Threshold Gate.',
};

const products = [
  {
    no: '01',
    name: 'AIO',
    tagline: 'Adopt · Integrate · Own',
    desc: 'Vendor-neutral BIM intelligence for review, control and execution workflows.',
    status: 'In development',
    href: '/contact',
  },
  {
    no: '02',
    name: 'DiSam',
    tagline: 'Commercial BIM readiness',
    desc: 'Structured BIM-to-5D mapping and commercial readiness for quantity and cost workflows. A Revit-based commercial BIM plugin for model classification, information readiness and downstream quantity surveying.',
    status: 'Early access',
    href: '/contact',
  },
  {
    no: '03',
    name: 'SiteReport AI',
    tagline: 'Field reporting',
    desc: 'AI-assisted field reporting for construction, engineering and site operations. Turns field notes, images and site observations into structured reporting workflows.',
    status: 'Beta',
    href: '/products/sitereport-ai',
  },
  {
    no: '04',
    name: 'Threshold Gate',
    tagline: 'Built-environment concept',
    desc: 'A technology-led architecture and infrastructure programme developed within the Threshold ecosystem.',
    status: 'Concept',
    href: '/contact',
  },
];

export default function ProductsPage() {
  return (
    <main>
      <section className="hero">
        <div className="wrap">
          <p className="kicker">Products</p>
          <h1>Four products in focus.</h1>
          <p>
            The current Threshold product portfolio is intentionally focused. Each product is
            developed within the ecosystem — some through MEL, some through THS Studio — and each
            addresses a real operational problem.
          </p>
          <div className="cta-row">
            <Link className="btn btn--primary" href="/contact">
              Discuss a product <span className="arrow">→</span>
            </Link>
            <Link className="btn btn--ghost" href="/studio">
              About THS Studio
            </Link>
          </div>
        </div>
      </section>

      {/* PRODUCT LIST */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker">Portfolio</p>
            <h2>Current product focus.</h2>
          </div>
          <div className="product-list">
            {products.map((product) => (
              <div key={product.no} className="product-item">
                <span className="product-item__no">{product.no}</span>
                <div className="product-item__body">
                  <h3>{product.name}</h3>
                  <p>{product.desc}</p>
                  <div className="product-item__meta">
                    <span className="product-item__status">{product.status}</span>
                    <span className="product-item__status">{product.tagline}</span>
                  </div>
                </div>
                <Link href={product.href} className="product-item__link">
                  {product.href === '/contact' ? 'Enquire' : 'View'} <span className="arrow">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--tight section--quiet">
        <div className="wrap">
          <p className="kicker">Get involved</p>
          <p className="statement">
            Interested in piloting a product before launch? Threshold runs early pilots with{' '}
            <em>selected partners</em>.
          </p>
          <div className="cta-row" style={{ marginTop: 32 }}>
            <Link className="btn btn--primary" href="/contact">
              Talk to Threshold <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
