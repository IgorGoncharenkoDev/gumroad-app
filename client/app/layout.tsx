import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import { QueryProvider } from '@/components/providers/query-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gumroad Clone App',
  description: 'Gumroad Clone App',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`min-h-dvh flex flex-col bg-[#f6f6f4] text-zinc-900 antialiased ${inter.className}`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
