import './globals.css'
import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import Navbar from '@/components/global/Navbar'
import Footer from '@/components/global/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })

export const metadata: Metadata = {
  metadataBase: new URL('https://threshold-technologies.com'),
  title: 'Threshold Technologies FZE LLC',
  description: 'Building Digital Infrastructure for Commercial Intelligence.',
  icons: { icon: '/Threshold_Technologies_Profile-Logo.png' },
  openGraph: {
    title: 'Threshold Technologies FZE LLC',
    description: 'AI, SaaS, consulting and education platforms engineered for business systems.',
    type: 'website',
    locale: 'en_AE',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
