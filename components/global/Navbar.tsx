"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'vision', label: 'Vision' },
  { id: 'services', label: 'Services' },
  { id: 'products', label: 'Products' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const onHome = pathname === '/';
  const [active, setActive] = useState('about');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!onHome) return;
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [onHome]);

  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  return (
    <header className="site-header">
      <nav aria-label="Primary">
        <Link href="/" className="wordmark" aria-label="Threshold Technologies — home">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <span className="wordmark-copy">
            <b>Threshold</b>
            <small>Technologies</small>
          </span>
        </Link>

        <div className="desktop-nav">
          {SECTIONS.map((s) => (
            <Link
              key={s.id}
              href={href(s.id)}
              className={onHome && active === s.id ? 'is-active' : undefined}
              aria-current={onHome && active === s.id ? 'true' : undefined}
            >
              {s.label}
            </Link>
          ))}
        </div>

        <Link href={href('contact')} className="nav-cta">Build With Threshold</Link>

        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <i /><i /><i />
        </button>
      </nav>

      <div className={`mobile-nav ${open ? 'open' : ''}`}>
        {SECTIONS.map((s) => (
          <Link
            key={s.id}
            href={href(s.id)}
            className={onHome && active === s.id ? 'is-active' : undefined}
            onClick={() => setOpen(false)}
          >
            {s.label}
          </Link>
        ))}
        <Link href={href('contact')} className="nav-cta" onClick={() => setOpen(false)}>
          Build With Threshold
        </Link>
      </div>
    </header>
  );
}
