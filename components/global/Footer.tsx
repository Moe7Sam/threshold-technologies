import Link from 'next/link';

export default function Footer() {
  return <footer className="site-footer threshold-footer"><div><span className="threshold-monogram">T</span><p>Threshold Technologies is the digital threshold between construction information and construction intelligence.</p></div><div className="footer-links"><Link href="/#about">About</Link><Link href="/#vision">Vision</Link><Link href="/#products">Products</Link><Link href="/#contact">Contact</Link></div><div className="footer-bottom"><span>United Arab Emirates</span><span>Â© {new Date().getFullYear()} Threshold Technologies</span></div></footer>;
}

