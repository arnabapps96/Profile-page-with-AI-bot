import './globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Arnab Mitra | Strategy & Operations Lead',
  description: 'Product, Strategy & Analytics Leader - General Manager at Lemon Tree Hotels, ex-BCG, ex-JP Morgan.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Navbar />
        {children}
        <footer style={{ padding: '4rem 0', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
          <div className="container">
            <p style={{ fontSize: '0.85rem', color: 'var(--light-muted)' }}>&copy; {new Date().getFullYear()} Arnab Mitra. Built with Next.js.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
