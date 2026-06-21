import Link from 'next/link';

const sections = [
  {
    title: 'What it does',
    copy: 'Turns field notes, images and site observations into structured reporting workflows.',
  },
  {
    title: 'Who it is for',
    copy: 'Construction teams, engineering consultants, site supervisors and project controls teams.',
  },
  {
    title: 'Core workflow',
    copy: 'Capture site input, structure the record, review the output and prepare report-ready data.',
  },
  {
    title: 'Key outputs',
    copy: 'Daily reports, issue logs, progress summaries and commercial intelligence records.',
  },
];

export const metadata = {
  title: 'SiteReport AI | Threshold Technologies',
  description: 'AI-assisted field reporting for construction, engineering and site operations.',
};

export default function Page() {
  return (
    <main className="premium-home">
      <section className="company-page-hero">
        <p className="premium-kicker">Product</p>
        <h1>SiteReport AI</h1>
        <p>AI-assisted field reporting for construction, engineering, and site operations.</p>
      </section>

      <section className="premium-section">
        <div className="premium-section__head">
          <p className="premium-kicker">Product Overview</p>
          <h2>Structured reporting for teams that need clearer site intelligence.</h2>
        </div>
        <div className="ecosystem-grid">
          {sections.map((section, index) => (
            <article className="ecosystem-card" key={section.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{section.title}</h3>
              <p>{section.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section contact-section--compact">
        <p className="premium-kicker">Current Status</p>
        <h2>Beta / internal prototype.</h2>
        <div className="contact-links">
          <Link href="mailto:info@threshold-technologies.com?subject=SiteReport%20AI%20early%20access">
            Request early access
          </Link>
          <Link href="/contact">Contact Threshold</Link>
        </div>
      </section>
    </main>
  );
}
