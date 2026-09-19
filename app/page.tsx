import Link from 'next/link';

export const metadata = {
  title: 'Threshold Technologies — Engineering, Technology & Digital Products',
  description:
    'Threshold Technologies is a UAE-based engineering, technology and product development ecosystem connecting engineering delivery, applied research and digital products.',
};

const ecosystemBranches = [
  {
    tag: 'Threshold Technologies',
    title: 'The umbrella',
    copy: 'The parent company connecting engineering, research, product development and commercial engagement under one operating ecosystem.',
    href: '/about',
    cta: 'About',
  },
  {
    tag: 'MEL',
    title: 'Modern Engineering Lab',
    copy: 'Engineering, digital engineering, commercial, technical review, infrastructure, research and product-development arm.',
    href: '/mel',
    cta: 'Explore MEL',
  },
  {
    tag: 'THS Studio',
    title: 'Commercialisation studio',
    copy: 'Business development, client acquisition, market engagement, partnerships and product commercialisation arm.',
    href: '/studio',
    cta: 'Explore THS Studio',
  },
];

const quickRoutes = [
  ['Products', 'Digital product portfolio', 'AIO, DiSam, SiteReport AI and Threshold Gate.', '/products'],
  ['Services', 'Commercial engagement routes', 'Technical review, BIM, cost engineering, infrastructure and R&D.', '/services'],
  ['Contact', 'Start a conversation', 'Discuss a project, request a review or explore a partnership.', '/contact'],
];

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="wrap">
          <p className="kicker">Threshold Technologies FZE LLC</p>
          <h1>Engineering, technology and digital products under one ecosystem.</h1>
          <p>
            Threshold connects engineering delivery, applied research and product development.
            MEL provides engineering and technical depth. THS Studio commercialises validated
            work into market-ready products and client engagements.
          </p>
          <div className="cta-row">
            <Link className="btn btn--primary" href="/contact">
              Engage with Threshold <span className="arrow">→</span>
            </Link>
            <Link className="btn btn--ghost" href="/about">
              Understand the ecosystem
            </Link>
          </div>
        </div>
      </section>

      {/* SECTOR STRIP */}
      <div className="wrap">
        <div className="sectors">
          <span>Engineering</span>
          <span>Technology</span>
          <span>Research</span>
          <span>Digital Products</span>
          <span>Commercialisation</span>
        </div>
      </div>

      {/* WHAT THRESHOLD IS */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker">What Threshold is</p>
            <h2>The line between information and engineering intelligence.</h2>
            <p className="lede">
              A threshold is the point where something crosses over and changes state. We
              structure engineering knowledge, data and workflows so teams can review, decide
              and deliver with greater control.
            </p>
          </div>
          <div className="threshold">
            <p className="threshold__cap">Information crossing the threshold</p>
            <div className="threshold__track">
              {['Data', 'AI', 'Automation', 'Intelligence'].map((label, index) => (
                <div className="node" key={label}>
                  <span className="node__n">0{index + 1}</span>
                  <span className="node__label">{label}</span>
                </div>
              ))}
            </div>
            <p className="threshold__note">
              From raw data, through AI and automation, into controlled intelligence — the same
              logic connects the work across Threshold, MEL and THS Studio.
            </p>
          </div>
        </div>
      </section>

      {/* ECOSYSTEM OVERVIEW */}
      <section className="section section--quiet">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker">The Threshold Ecosystem</p>
            <h2>One company. Three connected branches.</h2>
          </div>
          <div className="eco-grid">
            {ecosystemBranches.map((branch) => (
              <Link key={branch.tag} href={branch.href} className="eco-card">
                <span className="eco-card__tag">{branch.tag}</span>
                <h3>{branch.title}</h3>
                <p>{branch.copy}</p>
                <b>{branch.cta} →</b>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK ROUTES */}
      <section className="section section--tight">
        <div className="wrap">
          <div className="grid grid--3">
            {quickRoutes.map(([tag, title, copy, href]) => (
              <Link key={tag} href={href} className="card">
                <span className="card__tag">{tag}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
                <b>Open →</b>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section section--tight">
        <div className="wrap">
          <p className="kicker">Engage</p>
          <p className="statement">
            Whether you need a <em>technical review</em>, a <em>digital engineering partner</em>,
            or want to explore a <em>product partnership</em> — start with a conversation.
          </p>
          <div className="cta-row" style={{ marginTop: 32 }}>
            <Link className="btn btn--primary" href="/contact">
              Contact Threshold <span className="arrow">→</span>
            </Link>
            <Link className="btn btn--ghost" href="/services">
              View services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
