import Link from 'next/link';

export const metadata = {
  title: 'Threshold Technologies — Engineering, Technology & Digital Products',
  description:
    'Threshold Technologies is a UAE-based engineering, technology and product development ecosystem connecting engineering delivery, applied research and digital products.',
};

const ecosystemBranches = [
  {
    index: '01',
    tag: 'Threshold Technologies',
    title: 'The umbrella',
    copy: 'The parent company connecting engineering, research, product development and commercial engagement under one operating ecosystem.',
    href: '/about',
    cta: 'About Threshold',
  },
  {
    index: '02',
    tag: 'MEL',
    title: 'Modern Engineering Lab',
    copy: 'Engineering, digital engineering, commercial, technical review, infrastructure, research and product-development arm.',
    href: '/mel',
    cta: 'Explore MEL',
  },
  {
    index: '03',
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

function EcosystemMap() {
  return (
    <div className="ecosystem-map" aria-label="Threshold ecosystem connects MEL, Threshold Technologies and THS Studio">
      <div className="ecosystem-map__meta">
        <span>System map / 01</span>
        <span>Engineering to market</span>
      </div>
      <svg viewBox="0 0 680 400" role="img" aria-labelledby="ecosystem-map-title ecosystem-map-desc">
        <title id="ecosystem-map-title">Threshold ecosystem operating map</title>
        <desc id="ecosystem-map-desc">MEL, Threshold Technologies and THS Studio form connected parts of one ecosystem.</desc>
        <defs>
          <pattern id="grid" width="34" height="34" patternUnits="userSpaceOnUse">
            <path d="M 34 0 L 0 0 0 34" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="680" height="400" fill="url(#grid)" className="ecosystem-map__grid" />
        <path className="ecosystem-map__link" d="M144 198 C224 94 314 94 340 198 S478 302 550 198" />
        <path className="ecosystem-map__link ecosystem-map__link--gold" d="M144 198 C224 94 314 94 340 198 S478 302 550 198" />
        <line className="ecosystem-map__axis" x1="70" y1="198" x2="610" y2="198" />
        <circle className="ecosystem-map__node" cx="144" cy="198" r="46" />
        <circle className="ecosystem-map__node ecosystem-map__node--core" cx="340" cy="198" r="61" />
        <circle className="ecosystem-map__node" cx="550" cy="198" r="46" />
        <text className="ecosystem-map__label" x="144" y="205" textAnchor="middle">MEL</text>
        <text className="ecosystem-map__label ecosystem-map__label--core" x="340" y="205" textAnchor="middle">THRESHOLD</text>
        <text className="ecosystem-map__label" x="550" y="205" textAnchor="middle">THS</text>
        <text className="ecosystem-map__annotation" x="144" y="282" textAnchor="middle">ENGINEERING</text>
        <text className="ecosystem-map__annotation" x="340" y="108" textAnchor="middle">PLATFORM</text>
        <text className="ecosystem-map__annotation" x="550" y="282" textAnchor="middle">MARKET</text>
      </svg>
      <div className="ecosystem-map__legend">
        <span><i /> Applied engineering</span>
        <span><i /> Connected intelligence</span>
        <span><i /> Commercial engagement</span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <section className="home-hero">
        <div className="wrap home-hero__layout">
          <div className="home-hero__content">
            <p className="kicker">Threshold Technologies FZE LLC</p>
            <h1>Engineering intelligence, built to move.</h1>
            <p>
              Threshold connects engineering delivery, applied research and product development.
              MEL provides technical depth. THS Studio turns validated work into products and
              client engagements.
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
          <EcosystemMap />
        </div>
      </section>

      <div className="wrap">
        <div className="sectors sectors--numbered">
          <span>Engineering</span>
          <span>Technology</span>
          <span>Research</span>
          <span>Digital Products</span>
          <span>Commercialisation</span>
        </div>
      </div>

      <section className="section threshold-section">
        <div className="wrap threshold-section__layout">
          <div className="section-head">
            <p className="kicker">What Threshold is</p>
            <h2>The point where information becomes engineering intelligence.</h2>
            <p className="lede">
              We structure engineering knowledge, data and workflows so teams can review, decide
              and deliver with greater control.
            </p>
          </div>
          <div className="threshold threshold--diagram">
            <p className="threshold__cap">Operational transformation / 01—04</p>
            <div className="threshold__track">
              {['Data', 'AI', 'Automation', 'Intelligence'].map((label, index) => (
                <div className="node" key={label}>
                  <span className="node__n">0{index + 1}</span>
                  <span className="node__label">{label}</span>
                </div>
              ))}
            </div>
            <p className="threshold__note">
              A shared operating logic: translate raw inputs into technical clarity, then into
              controlled action.
            </p>
          </div>
        </div>
      </section>

      <section className="section home-evidence">
        <div className="wrap home-evidence__layout">
          <div className="home-evidence__visual">
            <img
              src="/evidence/mel/openbim/schependomlaan/openbim-model-reference.webp"
              alt="Reference rendering from the open Schependomlaan OpenBIM demonstration dataset."
              loading="lazy"
            />
            <span>OpenBIM / Federated Information</span>
          </div>
          <div>
            <p className="kicker">Evidence-led workflow</p>
            <h2>Model → data → review → decision.</h2>
            <p className="lede">
              MEL&apos;s evidence layer uses an open reference model to demonstrate how geometry,
              information and review context can be held together.
            </p>
            <Link className="text-link" href="/mel">View MEL evidence layer <span>→</span></Link>
            <p className="home-evidence__attribution">
              OpenBIM demonstration based on the Schependomlaan sample dataset, buildingSMART
              Community Sample Test Files — CC BY 4.0.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--quiet ecosystem-section">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker">The Threshold ecosystem</p>
            <h2>One operating system. Three distinct roles.</h2>
          </div>
          <div className="ecosystem-index">
            {ecosystemBranches.map((branch) => (
              <Link key={branch.tag} href={branch.href} className="ecosystem-index__item">
                <span className="ecosystem-index__number">{branch.index}</span>
                <div>
                  <span className="ecosystem-index__tag">{branch.tag}</span>
                  <h3>{branch.title}</h3>
                </div>
                <p>{branch.copy}</p>
                <span className="ecosystem-index__link">{branch.cta} <b>→</b></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section engagement-section">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker">Ways to engage</p>
            <h2>Start with the work in front of you.</h2>
          </div>
          <div className="engagement-rail">
            {quickRoutes.map(([tag, title, copy, href], index) => (
              <Link key={tag} href={href} className="engagement-rail__item">
                <span>0{index + 1} / {tag}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
                <b>Open <em>→</em></b>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight section--quiet">
        <div className="wrap final-callout">
          <p className="kicker">Engage</p>
          <p className="statement">
            Whether you need a <em>technical review</em>, a <em>digital engineering partner</em>,
            or want to explore a <em>product partnership</em> — start with a conversation.
          </p>
          <div className="cta-row">
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
