import Link from 'next/link';

export const metadata = {
  title: 'Contact | Threshold Technologies',
  description:
    'Contact Threshold Technologies to discuss a project, request a technical review, explore a digital engineering requirement, or inquire about products and partnerships.',
};

const routes = [
  {
    title: 'Discuss a Project',
    desc: 'General project conversations, engineering engagements and digital delivery requirements.',
    href: 'mailto:info@threshold-technologies.com?subject=Discuss%20a%20Project',
  },
  {
    title: 'Request a Technical Review',
    desc: 'Technical review, audit, compliance review, constructability review or digital assurance.',
    href: 'mailto:info@threshold-technologies.com?subject=Request%20a%20Technical%20Review',
  },
  {
    title: 'Explore a Digital Engineering Requirement',
    desc: 'BIM, digital engineering, automation, AI tools and workflow development.',
    href: 'mailto:info@threshold-technologies.com?subject=Digital%20Engineering%20Requirement',
  },
  {
    title: 'Product / Partnership Inquiry',
    desc: 'Product access, pilot programs, partnerships and commercial collaboration.',
    href: 'mailto:info@threshold-technologies.com?subject=Product%20Partnership%20Inquiry',
  },
];

export default function Contact() {
  return (
    <main>
      <section className="hero">
        <div className="wrap">
          <p className="kicker">Contact</p>
          <h1>Build with Threshold.</h1>
          <p>
            For partnerships, product access, technical reviews, digital engineering requirements
            and collaboration. We reply to every serious enquiry.
          </p>
          <div className="cta-row">
            <a className="btn btn--primary" href="mailto:info@threshold-technologies.com">
              Email Threshold <span className="arrow">→</span>
            </a>
            <Link className="btn btn--ghost" href="/services">
              View services
            </Link>
          </div>
        </div>
      </section>

      {/* ENGAGEMENT ROUTES */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker">Engagement routes</p>
            <h2>Route the conversation to the right part of the company.</h2>
          </div>
          <div className="contact-grid">
            <div className="contact-routes">
              {routes.map((route) => (
                <a key={route.title} href={route.href} className="contact-route">
                  <div>
                    <h3>{route.title}</h3>
                    <p>{route.desc}</p>
                  </div>
                  <span className="arrow">→</span>
                </a>
              ))}
            </div>
            <aside className="aside-line">
              <span className="mono-label">Registered</span>
              <p>
                Threshold Technologies FZE LLC
                <br />
                Ajman NuVentures Centre Free Zone
                <br />
                United Arab Emirates
              </p>
              <ul className="tags">
                <li>Partnerships</li>
                <li>Technical Review</li>
                <li>Digital Engineering</li>
                <li>Products</li>
                <li>Pilots</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
