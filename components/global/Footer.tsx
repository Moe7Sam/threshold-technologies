import Link from 'next/link';

export default function Footer() {
  const principles = [
    ['Consulting', 'Advisory'],
    ['SaaS Platforms', 'Systems'],
    ['Academy', 'Learning'],
    ['Ventures & IP', 'Future Businesses'],
  ];

  return (
    <footer className="site-footer">
      <div className="footer-principles">
        {principles.map(([label, copy]) => (
          <div key={label}>
            <span>{label}</span>
            <strong>{copy}</strong>
          </div>
        ))}
      </div>
      <div className="footer-top">
        <div>
          <p className="kicker">Threshold Technologies FZE LLC</p>
          <h2>Digital infrastructure for commercial intelligence.</h2>
        </div>
        <div className="footer-links">
          <Link href="/">Home</Link>
          <Link href="/consulting">Consulting</Link>
          <Link href="/saas">SaaS Platforms</Link>
          <Link href="/academy">Academy</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>Ajman NuVentures Centre Free Zone - United Arab Emirates</span>
        <span>(c) {new Date().getFullYear()} Threshold Technologies FZE LLC</span>
      </div>
    </footer>
  );
}
