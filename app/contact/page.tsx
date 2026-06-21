const contactSections = [
  {
    title: 'Business Enquiries',
    copy: 'Consulting, platforms and digital delivery conversations.',
    href: 'mailto:info@threshold-technologies.com?subject=Business%20enquiry',
  },
  {
    title: 'Partnerships',
    copy: 'Strategic collaboration across technology, construction and education.',
    href: 'mailto:info@threshold-technologies.com?subject=Partnership%20enquiry',
  },
  {
    title: 'Product Access',
    copy: 'Early access conversations for SiteReport AI and future product pilots.',
    href: 'mailto:info@threshold-technologies.com?subject=Product%20access',
  },
  {
    title: 'Founder Contact',
    copy: 'Founder-led conversations for strategic opportunities and commercial systems.',
    href: 'mailto:info@threshold-technologies.com?subject=Founder%20contact',
  },
];

const contactLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/search/results/all/?keywords=Threshold%20Technologies%20FZE%20LLC',
  },
  { label: 'Email', href: 'mailto:info@threshold-technologies.com' },
  { label: 'UAE Headquarters', href: 'mailto:info@threshold-technologies.com?subject=UAE%20headquarters' },
];

export const metadata = {
  title: 'Contact | Threshold Technologies',
  description: 'Contact Threshold Technologies for business enquiries, partnerships, product access and founder contact.',
};

export default function Page() {
  return (
    <main className="premium-home">
      <section className="company-page-hero">
        <p className="premium-kicker">Contact</p>
        <h1>Start a focused conversation with Threshold Technologies.</h1>
        <p>For business enquiries, partnerships, careers and investor relations.</p>
      </section>

      <section className="premium-section">
        <div className="premium-section__head">
          <p className="premium-kicker">Enquiries</p>
          <h2>Route the conversation to the right part of the company.</h2>
        </div>
        <div className="ecosystem-grid">
          {contactSections.map((section, index) => (
            <a className="ecosystem-card" href={section.href} key={section.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{section.title}</h3>
              <p>{section.copy}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="contact-section contact-section--compact">
        <p className="premium-kicker">Channels</p>
        <h2>LinkedIn, email and UAE headquarters.</h2>
        <div className="contact-links">
          {contactLinks.map((item) => (
            <a href={item.href} key={item.label}>{item.label}</a>
          ))}
        </div>
      </section>
    </main>
  );
}
