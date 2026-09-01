import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Koushick Padmanabhan | Software Developer',
  description:
    'Software Developer with 4+ years of experience engineering scalable Financial Services and Healthcare systems with Java, Spring Boot, microservices, Apache Kafka, and applied Generative AI. Based in New Jersey.',
  keywords: [
    'Software Developer',
    'Java',
    'Spring Boot',
    'Microservices',
    'Apache Kafka',
    'AWS',
    'Kubernetes',
    'Generative AI',
    'RAG',
  ],
  authors: [{ name: 'Koushick Padmanabhan' }],
  openGraph: {
    title: 'Koushick Padmanabhan | Software Developer',
    description:
      'Software Developer engineering scalable Financial Services and Healthcare systems with Java, Spring Boot, microservices, and applied Generative AI.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Koushick Padmanabhan | Software Developer',
    description:
      'Software Developer engineering scalable Financial Services and Healthcare systems with Java, Spring Boot, microservices, and applied Generative AI.',
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
        <SpeedInsights />
      </body>
    </html>
  )
}
