import './globals.css'
import { Inter } from 'next/font/google'
import { NextAuthProvider } from './NextAuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Vsafar',
  description: 'Team Quicklo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" data-theme="light">
      <body className={inter.className}>
        <NextAuthProvider>
        {children}
        </NextAuthProvider>
        </body>
    </html>
  )
}
