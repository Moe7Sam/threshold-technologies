const contactSections = [
  {
    title: 'Business Enquiries',
    copy: 'Consulting, platforms and digital delivery conversations.',
  },
  {
    title: 'Partnerships',
    copy: 'Strategic collaboration across technology, construction and education.',
  },
  {
    title: 'Careers',
    copy: 'Future opportunities for product, advisory and learning talent.',
  },
  {
    title: 'Investor Relations',
    copy: 'Venture, IP and long-term growth discussions.',
  },
];

const contactLinks = ['LinkedIn', 'Email', 'UAE Headquarters'];

export const metadata = {
  title: 'Contact | Threshold Technologies',
  description: 'Business enquiries, partnerships, careers and investor relations for Threshold Technologies.',
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
            <article className="ecosystem-card" key={section.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{section.title}</h3>
              <p>{section.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section contact-section--compact">
        <p className="premium-kicker">Channels</p>
        <h2>LinkedIn, email and UAE headquarters.</h2>
        <div className="contact-links">
          {contactLinks.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>
    </main>
  );
}
