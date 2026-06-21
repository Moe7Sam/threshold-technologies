import Link from 'next/link';

const founderSections = [
  {
    title: 'Professional background',
    copy: 'Civil engineering, quantity surveying and digital construction experience across built-environment delivery.',
  },
  {
    title: 'Focus areas',
    copy: 'Commercial intelligence, BIM, AI systems, project controls and enterprise technology.',
  },
  {
    title: 'Why Threshold exists',
    copy: 'To build practical systems that connect field delivery, commercial data and business decision-making.',
  },
  {
    title: 'Contact / LinkedIn CTA',
    copy: 'For founder-led conversations, product access and strategic partnerships.',
  },
];

export const metadata = {
  title: 'Founder | Threshold Technologies',
  description: 'Mohammad Samir Ahmad, Founder and Managing Director of Threshold Technologies.',
};

export default function Page() {
  return (
    <main className="premium-home">
      <section className="company-page-hero">
        <p className="premium-kicker">Founder</p>
        <h1>Mohammad Samir Ahmad</h1>
        <p>
          Founder &amp; Managing Director. Civil Engineer, Quantity Surveyor, and Digital Construction professional
          building commercial intelligence systems for the built environment and business operations.
        </p>
      </section>

      <section className="premium-section">
        <div className="premium-section__head">
          <p className="premium-kicker">Profile</p>
          <h2>Founder-led technology focused on credible, useful business systems.</h2>
        </div>
        <div className="ecosystem-grid">
          {founderSections.map((section, index) => (
            <article className="ecosystem-card" key={section.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{section.title}</h3>
              <p>{section.copy}</p>
            </article>
          ))}
        </div>
        <div className="contact-links contact-links--spaced">
          <Link href="mailto:info@threshold-technologies.com?subject=Founder%20contact">
            Contact Founder
          </Link>
          <Link href="https://www.linkedin.com/search/results/all/?keywords=Mohammad%20Samir%20Ahmad%20Threshold%20Technologies">
            LinkedIn
          </Link>
        </div>
      </section>
    </main>
  );
}
