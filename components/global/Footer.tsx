import Link from 'next/link';

const footerLinks = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/mel', 'MEL'],
  ['/studio', 'THS Studio'],
  ['/products', 'Products'],
  ['/services', 'Services'],
  ['/contact', 'Contact'],
] as const;

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <p className="kicker">Threshold Technologies FZE LLC</p>
            <h2>Engineering, technology and digital products under one ecosystem.</h2>
          </div>
          <nav aria-label="Footer" className="footer-links">
            {footerLinks.map(([href, label]) => (
              <Link key={href} href={href}>{label}</Link>
            ))}
          </nav>
        </div>
        <div className="footer-bottom">
          <span>Ajman NuVentures Centre Free Zone — United Arab Emirates</span>
          <span>© {new Date().getFullYear()} Threshold Technologies FZE LLC</span>
        </div>
      </div>
    </footer>
  );
}
