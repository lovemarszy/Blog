import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import '../styles/main.css'

import CustomAnalytics from '#components/analytics'

import localFont from 'next/font/local'

export const inter = localFont({
  variable: '--font-inter',
  display: 'block',
  style: 'normal',
  src: [
    {
      path: '../public/fonts/InterDisplay-roman.var.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../public/fonts/InterDisplay-roman.var.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
})

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()
  const pageClass =
    pathname === '/posts' ? 'blog-post-index' : pathname === '/tags/[tag]' ? 'blog-tag-page' : ''

  return (
    <main className={`${inter.variable} font-sans ${pageClass}`}>
      <link rel="alternate" type="application/rss+xml" title="RSS" href="/feed.xml" />
      <Component {...pageProps} />
      <CustomAnalytics />
    </main>
  )
}
