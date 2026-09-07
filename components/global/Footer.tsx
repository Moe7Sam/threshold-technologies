import Link from 'next/link';

export default function Footer() {
  return <footer className="foot"><div className="wrap"><div className="foot__top"><p className="foot__statement">Engineering intelligence, applied research and digital products under one Threshold ecosystem.</p><nav aria-label="Footer"><ul className="foot__nav"><li><Link href="/">Home</Link></li><li><Link href="/about">About</Link></li><li><Link href="/services">Services</Link></li><li><Link href="/blog">Products</Link></li><li><Link href="/mel">MEL</Link></li><li><Link href="/studio">THS Studio</Link></li><li><Link href="/contact">Contact</Link></li></ul></nav></div><div className="foot__meta"><span>Threshold Technologies FZE LLC — Ajman NuVentures Centre Free Zone, UAE</span><span>© {new Date().getFullYear()} Threshold Technologies FZE LLC</span></div></div></footer>;
}
