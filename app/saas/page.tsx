import Link from 'next/link';

const platforms = [
  {
    title: 'SiteReport AI',
    copy: 'AI-assisted reporting for site records, project visibility and delivery intelligence.',
  },
  {
    title: 'AI Workflows',
    copy: 'Automation layers that reduce manual coordination and improve operating speed.',
  },
  {
    title: 'Industry Platforms',
    copy: 'Dashboards and tools for construction, commercial management and business teams.',
  },
  {
    title: 'Future Products',
    copy: 'Internal IP developed into focused software products and future ventures.',
  },
];

export const metadata = {
  title: 'SaaS Platforms | Threshold Technologies',
  description: 'AI tools, workflows, industry platforms and future software products from Threshold Technologies.',
};

export default function Page() {
  return (
    <main className="premium-home">
      <section className="company-page-hero">
        <p className="premium-kicker">SaaS Platforms</p>
        <h1>Technology products for commercial intelligence and digital operations.</h1>
        <p>Threshold builds software systems, AI workflows and industry platforms.</p>
      </section>

      <section className="premium-section premium-section--quiet">
        <div className="premium-section__head">
          <p className="premium-kicker">Product Direction</p>
          <h2>Software built from real operational problems, not generic SaaS templates.</h2>
        </div>
        <div className="work-list">
          {platforms.map((platform, index) => (
            <article key={platform.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{platform.title}</h3>
                <p>{platform.copy}</p>
              </div>
            </article>
          ))}
        </div>
        <Link href="/contact" className="premium-button premium-button--inline">
          Discuss Platform
        </Link>
      </section>
    </main>
  );
}
