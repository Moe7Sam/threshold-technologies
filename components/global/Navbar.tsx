"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const links = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/mel', 'MEL'],
  ['/studio', 'THS Studio'],
  ['/products', 'Products'],
  ['/services', 'Services'],
  ['/contact', 'Contact'],
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <nav>
        <Link href="/" className="wordmark" aria-label="Threshold Technologies home">
          <span className="brand-mark" aria-hidden="true"><i></i><i></i></span>
          <span className="wordmark-copy">
            <b>Threshold</b>
            <small>Technologies</small>
          </span>
        </Link>
        <div className="desktop-nav">
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className={pathname === href ? 'is-active' : ''}
            >
              {label}
            </Link>
          ))}
        </div>
        <Link href="/contact" className="nav-cta">Engage</Link>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          Menu
        </button>
      </nav>
      <div className={`mobile-nav ${open ? 'open' : ''}`} id="mobile-menu">
        {links.map(([href, label]) => (
          <Link
            key={href}
            href={href}
            className={pathname === href ? 'is-active' : ''}
            onClick={() => setOpen(false)}
          >
            {label}
          </Link>
        ))}
        <Link href="/contact" className="nav-cta" onClick={() => setOpen(false)}>Engage</Link>
      </div>
    </header>
  );
}
