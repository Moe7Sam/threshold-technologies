import Link from 'next/link';

export const metadata = {
  title: 'About | Threshold Technologies',
  description:
    'Threshold Technologies is a UAE-based engineering, technology and product development ecosystem.',
};

const team = [
  { no: '01', name: 'Mohammad Samir', role: 'Founder & Managing Director', desc: 'Civil engineer, quantity surveyor and digital construction specialist leading the Threshold ecosystem.' },
  { no: '02', name: 'Omar Osama', role: 'Engineering & R&D Director', desc: 'Directs engineering capability, research and technical development across MEL.' },
  { no: '03', name: 'Abir Moussa', role: 'Business Development Manager', desc: 'Leads market engagement, client acquisition and partnership development.' },
  { no: '04', name: 'Karem Assi', role: 'Sales & Client Solutions Manager', desc: 'Manages client solutions, commercial conversations and opportunity development.' },
  { no: '05', name: 'Samir', role: 'Commercial & Technical Advisor', desc: 'Provides commercial and technical advisory across the Threshold ecosystem.' },
];

const themes = [
  ['Engineering', 'Technical depth across civil, structural, MEP, infrastructure and digital engineering disciplines.'],
  ['Technology', 'Software, AI, automation and digital tools built from real operational problems.'],
  ['Research', 'Applied research and experimentation through MEL — turning industry problems into validated methods.'],
  ['Commercialisation', 'THS Studio takes validated work and prepares it for market entry and client engagement.'],
  ['Product Development', 'In-house digital products developed across the ecosystem — AIO, DiSam, SiteReport AI, Threshold Gate.'],
  ['Specialist Delivery', 'MEL assembles specialist delivery capability around project requirements.'],
];

export default function About() {
  return (
    <main>
      <section className="hero">
        <div className="wrap">
          <p className="kicker">About Threshold</p>
          <h1>One ecosystem. Three connected branches.</h1>
          <p>
            Threshold Technologies is a UAE-based engineering, technology and product development
            company. MEL provides engineering and research depth. THS Studio commercialises
            validated work into products and client engagements. Together they form a connected
            path from problem to market.
          </p>
          <div className="cta-row">
            <Link className="btn btn--primary" href="/mel">
              Explore MEL <span className="arrow">→</span>
            </Link>
            <Link className="btn btn--ghost" href="/studio">
              Explore THS Studio
            </Link>
          </div>
        </div>
      </section>

      {/* OPERATING MODEL */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker">Operating model</p>
            <h2>How the ecosystem works.</h2>
            <p className="lede">
              Threshold is not a conventional consultancy or a software company. It is a connected
              system where engineering knowledge, research and product development feed each
              other.
            </p>
          </div>
          <div className="split">
            <div>
              <p className="kicker">Vision</p>
              <h2>Integrating technology across every sector</h2>
              <p>
                Our vision is to integrate engineering, AI and automation into the core of how
                businesses operate — so teams decide and deliver with greater accuracy.
              </p>
            </div>
            <div>
              <p className="kicker">Mission</p>
              <h2>Turning information into intelligence</h2>
              <p>
                Our mission is to build systems and software that carry business information across
                the threshold — from raw data, through engineering and AI, into structured,
                commercially ready intelligence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="section section--quiet">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker">What we do</p>
            <h2>Six themes connect the work.</h2>
          </div>
          <div className="grid grid--3">
            {themes.map(([title, copy]) => (
              <article key={title} className="card">
                <span className="card__tag">{title}</span>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker">Team</p>
            <h2>Capability-led, deliberately small.</h2>
            <p className="lede">
              The Threshold team is structured around engineering, commercial and technical
              capability — not headcount.
            </p>
          </div>
          <div className="team-grid">
            {team.map((member) => (
              <div key={member.no} className="team-member">
                <span className="team-member__no">{member.no}</span>
                <h3>{member.name}</h3>
                <span className="team-member__role">{member.role}</span>
                <p>{member.desc}</p>
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
            Want to understand how Threshold can support your project or organisation?{' '}
            <em>Start a conversation.</em>
          </p>
          <div className="cta-row" style={{ marginTop: 32 }}>
            <Link className="btn btn--primary" href="/contact">
              Contact Threshold <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
