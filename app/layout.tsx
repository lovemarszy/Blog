import type { ReactNode } from 'react'
import { Layout } from 'nextra-theme-blog'
import { Head } from 'nextra/components'
import localFont from 'next/font/local'
import 'nextra-theme-blog/style.css'
import '../styles/main.css'

const inter = localFont({
  variable: '--font-inter',
  display: 'block',
  src: [
    { path: '../public/fonts/InterDisplay-roman.var.woff2', weight: '100 900', style: 'normal' },
  ],
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <Head backgroundColor={{ light: '#fcfcfc', dark: '#18181a' }} />
      <body className="bg-back-light tracking-custom antialiased selection:bg-selected dark:bg-back-dark ss:min-h-dynamic">
        <main className={`${inter.variable} blog-shell font-sans`}>
          <Layout>{children}</Layout>
        </main>
      </body>
    </html>
  )
}
