import { useRouter } from 'next/router'
import { signOgUrl } from '../lib/og-signer'

const Head = ({ meta }: { meta: Record<string, any> }) => {
  const Site = `Marszy's Blog`
  const apiBase = 'https://og.loveur.life/api/og'
  const router = useRouter()
  const title = meta.title || 'Untitled'
  const excerpt = meta.description || ''
  const author = meta.author || 'Marszy'
  const tag = meta.tag || ''
  const date = meta.date ? new Date(meta.date).toISOString().split('T')[0] : ''
  const params = new URLSearchParams()
  params.set('title', title)
  params.set('site', Site)

  if (excerpt) params.set('excerpt', excerpt)
  if (author) params.set('author', author)
  if (tag) params.set('tag', tag)
  if (date) params.set('date', date)
  if (meta.image) {
    params.set('image', meta.image)
  }
  const rawUrl = new URL(`${apiBase}?${params.toString()}`)
  const ogImageUrl = signOgUrl(rawUrl)
  const currentTitle = meta.title === `About` ? Site : `${title} - ${Site}`
  const canonicalUrl = (
    `https://blog.loveur.life` + (router.asPath === '/' ? '' : router.asPath)
  ).split('?')[0]

  return (
    <>
      <title>{currentTitle}</title>
      <meta name="title" content={currentTitle} />
      <meta name="description" content={excerpt} />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={currentTitle} />
      <meta property="og:description" content={excerpt} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="article" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:image" content={ogImageUrl} />
      <meta property="twitter:title" content={currentTitle} />
      <meta property="twitter:description" content={excerpt} />

      <link rel="canonical" href={canonicalUrl} />
      <link rel="feed" href="/feed.xml" type="application/rss+xml" title={Site} />
    </>
  )
}

export default Head
