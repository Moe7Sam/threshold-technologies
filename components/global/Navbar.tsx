"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar() {
  return <motion.header initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="site-header">
    <nav>
      <Link href="/" className="wordmark" aria-label="Threshold home"><span className="threshold-monogram">T</span><span className="wordmark-copy"><b>Threshold</b><small>Technologies</small></span></Link>
      <div className="desktop-nav"><Link href="/#about">About</Link><Link href="/#vision">Vision</Link><Link href="/#products">Products</Link><Link href="/#contact">Contact</Link></div>
      <Link href="/#contact" className="nav-cta">Build With Threshold</Link>
    </nav>
  </motion.header>;
}

