import Link from 'next/link';

const tracks = [
  {
    title: 'BIM v2.0',
    copy: 'Modern BIM practice for delivery teams, consultants and project leaders.',
  },
  {
    title: 'Digital Construction',
    copy: 'Applied learning across digital delivery, data workflows and site technology.',
  },
  {
    title: 'Commercial Intelligence Education',
    copy: 'Training that connects cost, contracts, reporting and executive decision-making.',
  },
  {
    title: 'Professional Training',
    copy: 'Focused programs for future-ready construction and business professionals.',
  },
];

export const metadata = {
  title: 'Academy | Threshold Technologies',
  description: 'BIM, digital construction, commercial intelligence and professional training programs.',
};

export default function Page() {
  return (
    <main className="premium-home">
      <section className="company-page-hero">
        <p className="premium-kicker">Academy</p>
        <h1>Professional learning for digital construction and commercial intelligence.</h1>
        <p>Structured education for teams moving from traditional delivery to intelligent systems.</p>
      </section>

      <section className="premium-section">
        <div className="premium-section__head">
          <p className="premium-kicker">Learning Tracks</p>
          <h2>Focused programs for practical skills, leadership and applied technology.</h2>
        </div>
        <div className="ecosystem-grid">
          {tracks.map((track, index) => (
            <article className="ecosystem-card" key={track.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{track.title}</h3>
              <p>{track.copy}</p>
            </article>
          ))}
        </div>
        <Link href="/contact" className="premium-button premium-button--inline">
          Academy Enquiry
        </Link>
      </section>
    </main>
  );
}
