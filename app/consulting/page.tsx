import Link from 'next/link';

const services = [
  {
    title: 'BIM & Digital Delivery',
    copy: 'Structured delivery systems for design, construction and asset data.',
  },
  {
    title: 'Cost Management',
    copy: 'Commercial control across budgets, procurement and project reporting.',
  },
  {
    title: 'Commercial Intelligence',
    copy: 'Decision frameworks that connect cost, risk and business performance.',
  },
  {
    title: 'Business Consulting',
    copy: 'Operating models, digital strategy and executive advisory for growth.',
  },
];

export const metadata = {
  title: 'Consulting | Threshold Technologies',
  description: 'Consulting for BIM, digital delivery, cost management, commercial intelligence and business systems.',
};

export default function Page() {
  return (
    <main className="premium-home">
      <section className="company-page-hero">
        <p className="premium-kicker">Consulting</p>
        <h1>Commercial advisory for digital delivery and business systems.</h1>
        <p>Executive consulting across construction, cost, intelligence and operating models.</p>
      </section>

      <section className="premium-section">
        <div className="premium-section__head">
          <p className="premium-kicker">Services</p>
          <h2>Practical advisory built for project control and enterprise clarity.</h2>
        </div>
        <div className="ecosystem-grid">
          {services.map((service, index) => (
            <article className="ecosystem-card" key={service.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
            </article>
          ))}
        </div>
        <Link href="/contact" className="premium-button premium-button--inline">
          Business Enquiry
        </Link>
      </section>
    </main>
  );
}
