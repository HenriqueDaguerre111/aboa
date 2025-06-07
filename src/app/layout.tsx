import './globals.css'
import type { ReactNode } from 'react'
import Header from '@/components/header'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Meu App',
  description: 'Aplicação com Next.js + Header',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Header />
        <main className="p-6">{children}</main>
      </body>
    </html>
  )
}
