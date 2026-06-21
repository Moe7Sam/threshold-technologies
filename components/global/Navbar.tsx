"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar() {
  return <motion.header initial={{opacity:0}} animate={{opacity:1}} className="site-header">
    <nav>
      <Link href="/" className="wordmark" aria-label="Threshold Technologies home">
        <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
        <span className="wordmark-copy">
          <b>Threshold</b>
          <small>Technologies</small>
        </span>
      </Link>
      <div className="desktop-nav">
        <Link href="/">Home</Link>
        <Link href="/consulting">Consulting</Link>
        <Link href="/saas">SaaS</Link>
        <Link href="/products/sitereport-ai">SiteReport AI</Link>
        <Link href="/academy">Academy</Link>
        <Link href="/founder">Founder</Link>
        <Link href="/contact">Contact</Link>
      </div>
      <Link href="/contact" className="nav-cta">Contact</Link>
    </nav>
  </motion.header>;
}
