import Link from 'next/link';

const ecosystem = [
  {
    title: 'Consulting',
    items: ['Engineering Consulting', 'BIM & Digital Delivery', 'Business Consulting'],
  },
  {
    title: 'SaaS Platforms',
    items: ['AI tools', 'Automation systems', 'Industry dashboards'],
  },
  {
    title: 'Academy',
    items: ['Professional training', 'Digital construction education', 'Business and technology learning'],
  },
  {
    title: 'Ventures & IP',
    items: ['Product development', 'Internal software assets', 'Future businesses'],
  },
];

const featuredWork = [
  'SiteReport AI',
  'Commercial Intelligence Systems',
  'BIM & Digital Delivery',
  'Digital Business Tools',
];

const founderFocus = [
  'Commercial Intelligence',
  'Digital Construction',
  'AI Systems',
  'Enterprise Technology',
];

export default function Home() {
  return (
    <main className="premium-home">
      <section className="premium-hero">
        <div className="premium-hero__copy">
          <p className="premium-kicker">Threshold Technologies FZE LLC</p>
          <h1>
            Building Digital Infrastructure
            <span>for Commercial Intelligence</span>
          </h1>
          <p>
            AI, SaaS, consulting and education platforms engineered for the next generation of business systems.
          </p>
          <div className="premium-actions">
            <Link href="#ecosystem" className="premium-button premium-button--gold">
              Explore Ecosystem
            </Link>
            <Link href="/contact" className="premium-button">
              Contact Founder
            </Link>
          </div>
        </div>
        <div className="premium-hero__panel" aria-hidden="true">
          <span>Commercial Intelligence</span>
          <strong>04</strong>
          <p>Business areas connected through consulting, software, education and owned IP.</p>
        </div>
      </section>

      <section id="ecosystem" className="premium-section">
        <div className="premium-section__head">
          <p className="premium-kicker">Threshold Ecosystem</p>
          <h2>One company structure for advisory, platforms, learning and venture creation.</h2>
        </div>
        <div className="ecosystem-grid">
          {ecosystem.map((area, index) => (
            <article className="ecosystem-card" key={area.title}>
              <span>0{index + 1}</span>
              <h3>{area.title}</h3>
              <ul>
                {area.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="premium-section premium-section--quiet">
        <div className="premium-section__head">
          <p className="premium-kicker">Featured Work</p>
          <h2>Systems and delivery capabilities built around commercial clarity.</h2>
        </div>
        <div className="work-list">
          {featuredWork.map((work, index) => (
            <article key={work}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{work}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="founder-section">
        <div>
          <p className="premium-kicker">Founder</p>
          <h2>Mohammad Samir Ahmad</h2>
          <p>Founder &amp; Managing Director</p>
        </div>
        <div className="focus-grid">
          {founderFocus.map((focus) => (
            <span key={focus}>{focus}</span>
          ))}
        </div>
      </section>

      <section className="contact-section">
        <p className="premium-kicker">Contact</p>
        <h2>UAE-based technology company building the next layer of commercial intelligence.</h2>
        <div className="contact-links">
          <Link href="/contact">LinkedIn</Link>
          <Link href="/contact">Email</Link>
          <span>UAE</span>
        </div>
      </section>
    </main>
  );
}
