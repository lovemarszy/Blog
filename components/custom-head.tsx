import { useRouter } from 'next/router'

const Head = ({ meta }: { meta: Record<string, any> }) => {
  const Site = `Marszy's Blog`
  const apiBase = 'https://og.loveur.life/api/og'
  const router = useRouter()

  // 1. 对应你文章 Frontmatter 的数据抓取
  const title = meta.title || 'Untitled'
  // 描述：对应你的 description 字段
  const excerpt = meta.description || ''
  const author = meta.author || 'Marszy'
  const tag = meta.tag || ''

  // 日期处理：将 2026/01/03 转换为 API 喜欢的 2026-01-03 格式
  const date = meta.date ? new Date(meta.date).toISOString().split('T')[0] : ''

  // 2. 构建动态 URL 参数
  const params = new URLSearchParams()
  params.set('title', title)
  params.set('site', Site)

  if (excerpt) params.set('excerpt', excerpt)
  if (author) params.set('author', author)
  if (tag) params.set('tag', tag)
  if (date) params.set('date', date)

  // ✅ 核心改进：如果文章有 image 字段，将其传给 OGIS 作为背景图
  if (meta.image) {
    params.set('image', meta.image)
  }

  // 最终生成的封面链接
  const ogImageUrl = `${apiBase}?${params.toString()}`

  // 3. 页面元数据
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
