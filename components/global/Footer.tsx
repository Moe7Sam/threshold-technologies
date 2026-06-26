import Link from 'next/link';

export default function Footer() {
  return <footer className="foot"><div className="wrap"><div className="foot__top"><p className="foot__statement">The threshold between business information and digital intelligence.</p><nav aria-label="Footer"><ul className="foot__nav"><li><Link href="/">Home</Link></li><li><Link href="/about">About</Link></li><li><Link href="/services">Services</Link></li><li><Link href="/blog">Blog</Link></li><li><Link href="/contact">Contact</Link></li></ul></nav></div><div className="foot__meta"><span>Threshold Technologies FZE LLC — Ajman NuVentures Centre Free Zone, UAE</span><span>© {new Date().getFullYear()} Threshold Technologies FZE LLC</span></div></div></footer>;
}
