import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Teko, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const teko = Teko({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-teko',
  display: 'swap',
})

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-sans',
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'AK-KAT — The Cat Is Real',
  description:
    'AK-KAT is the bodyguard of Thinking Cat and Cashcat. Deployed on Robinhood Chain. Yes, the cat is real. Are you still fading?',
  generator: 'v0.app',
  metadataBase: new URL('https://ak-kat.vercel.app'),
  openGraph: {
    title: 'AK-KAT — The Cat Is Real',
    description: 'The viral tactical cat. Deployed on Robinhood Chain. Are you still fading?',
    images: ['/ak-kat-hero.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AK-KAT — The Cat Is Real',
    description: 'The viral tactical cat. Deployed on Robinhood Chain. Are you still fading?',
    images: ['/ak-kat-hero.png'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0b0f0c',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${teko.variable} ${plexSans.variable} ${plexMono.variable} bg-background`}
    >
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
