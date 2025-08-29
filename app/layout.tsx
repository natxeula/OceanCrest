import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'
import './enhancements.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import NotificationBar from '@/components/NotificationBar'
import ScrollProgress from '@/components/ScrollProgress'
import ClientProvider from '@/components/ClientProvider'

const manrope = Manrope({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OceanCrest - Corporate',
  description: 'We make the films that we want to make.',
  keywords: 'entertainment, films, movies, gaming, production',
  authors: [{ name: 'OceanCrest' }],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎬</text></svg>",
  },
}

export const viewport: Viewport = {
  themeColor: '#2a1d3a',
  width: 'device-width',
  initialScale: 1.0,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dark">
      <body className={manrope.className}>
        <ClientProvider>
          <ScrollProgress />
          <NotificationBar />
          <Header />
          <main role="main">
            {children}
          </main>
          <Footer />
        </ClientProvider>
      </body>
    </html>
  )
}
