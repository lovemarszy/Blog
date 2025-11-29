import { useRouter } from 'next/router'

// ✅ 修复 1：将 meta 的类型改为 Record<string, any>，以匹配 Nextra 的官方定义
const Head = ({ meta }: { meta: Record<string, any> }) => {
  // Site info
  const Site = `Marszy's Blog`
  const twitterCard = `https://image.loveur.life/fengmian.png`

  // Get router
  const router = useRouter()
  const canonicalUrl = (
    `https://blog.loveur.life` + (router.asPath === '/' ? '' : router.asPath)
  ).split('?')[0]

  // ✅ 修复 2：安全地获取属性，如果 meta 里没有，就使用空字符串或默认值
  const metaTitle = meta.title || ''
  const metaDescription = meta.description || "Marszy's Blog"
  const metaImage = meta.image || twitterCard

  // Get Current Title
  const currentTitle = metaTitle === `About` ? Site : `${metaTitle} - ${Site}`

  return (
    <>
      {/* SEO : Traditional */}
      <meta name="robots" content="noodp" />
      <title>{currentTitle}</title>
      <meta name="title" content={currentTitle} />
      <meta name="author" content="Marszy" />
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl} />

      {/* SEO : Opengraph */}
      <meta property="og:title" content={currentTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={metaImage} />
      <meta name="og:site_name" content={Site} />

      {/* SEO : Twitter Card */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:image" content={metaImage} />
      <meta property="twitter:title" content={currentTitle} />
      <meta property="twitter:description" content={metaDescription} />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:site" content="@Marszy_Official" />

      {/* SEO : PWA realted */}
      <meta name="application-name" content={Site} />
      <meta name="apple-mobile-web-app-title" content={Site} />
      <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />

      {/* 这里的图标路径假设你有，如果没有可以删掉 */}
      {/* <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" /> */}
      {/* <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" /> */}
      {/* <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" /> */}

      {/* SEO : RSS */}
      <link rel="feed" href="/feed.xml" type="application/rss+xml" title={Site} />
    </>
  )
}

export default Head
