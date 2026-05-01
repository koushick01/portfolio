import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Koushick Padmanabhan | Software Engineer',
  description:
    'Software Engineer specializing in full-stack development and AI-integrated applications. Based in New Jersey.',
  keywords: ['Software Engineer', 'Full Stack Developer', 'Next.js', 'React', 'FastAPI', 'Python'],
  authors: [{ name: 'Koushick Padmanabhan' }],
  openGraph: {
    title: 'Koushick Padmanabhan | Software Engineer',
    description:
      'Software Engineer specializing in full-stack development and AI-integrated applications.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Koushick Padmanabhan | Software Engineer',
    description:
      'Software Engineer specializing in full-stack development and AI-integrated applications.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
