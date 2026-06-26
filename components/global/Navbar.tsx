"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const links = [['/', 'Home'], ['/about', 'About'], ['/services', 'Services'], ['/blog', 'Blog'], ['/contact', 'Contact']] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return <header className="nav"><div className="nav__inner">
    <Link href="/" className="brand" aria-label="Threshold Technologies home"><b>Threshold</b><span>Technologies</span></Link>
    <button type="button" className="nav__toggle" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>Menu</button>
    <nav className={`nav__menu ${open ? 'open' : ''}`} id="menu" aria-label="Primary"><ul className="nav__links">
      {links.map(([href, label]) => <li key={href}><Link href={href} aria-current={pathname === href ? 'page' : undefined} onClick={() => setOpen(false)}>{label}</Link></li>)}
    </ul><Link className="nav__cta" href="/contact" onClick={() => setOpen(false)}>Build With Threshold</Link></nav>
  </div></header>;
}
