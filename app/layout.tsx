import type { Metadata, Viewport } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'ClosetIQ',
    template: '%s | ClosetIQ',
  },
  description: 'Your intelligent wardrobe manager — organise, style, and discover.',
  keywords: ['wardrobe', 'fashion', 'outfit', 'closet', 'AI stylist'],
}

export const viewport: Viewport = {
  themeColor: '#faf8f4',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
