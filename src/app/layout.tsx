import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NuPeeks — Project Hub',
  description: 'All NuPeeks projects in one place',

  openGraph: {
    title: 'NuPeeks Project Hub',
    description: 'All NuPeeks projects in one place',
    url: 'https://project-tracker-nupeeks.vercel.app',
    siteName: 'NuPeeks Project Hub',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'NuPeeks Project Hub' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NuPeeks Project Hub',
    description: 'All NuPeeks projects in one place',
    images: ['/opengraph-image'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
