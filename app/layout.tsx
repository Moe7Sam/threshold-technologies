import './globals.css'
import type { Metadata } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import Navbar from '@/components/global/Navbar'
import Footer from '@/components/global/Footer'

const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://threshold-technologies.com'),
  title: 'Threshold Technologies — Digital Infrastructure for Construction',
  description:
    'Threshold Technologies builds digital systems that connect construction data, BIM models, commercial intelligence, and AI-assisted workflows.',
  icons: { icon: '/Threshold_Technologies_Profile-Logo.png' },
  openGraph: {
    title: 'Threshold Technologies',
    description: 'The digital threshold between construction information and construction intelligence.',
    type: 'website',
    locale: 'en_AE',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable} scroll-smooth`}>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
