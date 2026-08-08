import Link from 'next/link';

export const metadata = {
  title: 'Modern Engineering Lab | Threshold Technologies',
  description:
    'Modern Engineering Lab is the multidisciplinary engineering, technology and research laboratory operating under Threshold Technologies Holding.',
};

const disciplines = [
  'Digital Engineering & BIM',
  'AI & Automation',
  'Robotics & Technology',
  'Cost & Risk Engineering',
  'Computational Design',
  'Data & Digital Twins',
  'Research & Development',
  'Civil, Structural & MEP Engineering',
];

export default function LabPage() {
  return (
    <main>
      <section className="hero">
        <div className="wrap">
          <p className="eyebrow">A laboratory under Threshold Technologies Holding</p>
          <h1>Modern Engineering Lab</h1>
          <p>ENGINEERING × TECHNOLOGY × RESEARCH</p>
          <div className="cta-row">
            <a className="btn btn--primary" href="https://modern-engineering-lab.netlify.app">
              Visit MEL Website <span className="arrow">→</span>
            </a>
            <a className="btn btn--ghost" href="mailto:info@threshold-technologies.com">
              Collaborate with MEL
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="head">
            <p className="eyebrow">Role within Threshold</p>
            <h2>The applied research and engineering branch.</h2>
            <p className="lede">
              MEL brings engineering disciplines together with software, AI and research. It develops concepts, investigates real industry problems and creates structured paths toward projects, products and collaboration.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap">
          <div className="head">
            <p className="eyebrow">Departments</p>
            <h2>Multidisciplinary by design.</h2>
          </div>
          <div className="grid grid--3">
            {disciplines.map((discipline, index) => (
              <article className="card" key={discipline}>
                <span className="card__tag">{String(index + 1).padStart(2, '0')}</span>
                <h3>{discipline}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap">
          <p className="eyebrow">MEL Platform</p>
          <p className="statement">Explore the lab, its people, projects, research and collaboration pathway on the dedicated MEL website.</p>
          <div className="cta-row">
            <a className="btn btn--primary" href="https://modern-engineering-lab.netlify.app">
              Open Modern Engineering Lab <span className="arrow">→</span>
            </a>
            <Link className="btn btn--ghost" href="/contact">Contact Threshold</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
