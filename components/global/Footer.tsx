import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <span className="th-grid" aria-hidden="true" />
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <p className="kicker">// Threshold Technologies FZE LLC</p>
            <h2>The threshold between business information and digital intelligence.</h2>
          </div>
          <nav className="footer-links" aria-label="Footer">
            <Link href="/#about">About</Link>
            <Link href="/#vision">Vision</Link>
            <Link href="/#services">Services</Link>
            <Link href="/#products">Products</Link>
            <Link href="/#partners">Partners</Link>
            <Link href="/#contact">Contact</Link>
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
