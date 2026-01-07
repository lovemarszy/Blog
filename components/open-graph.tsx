import Link from 'next/link'

export function OG({
  image,
  title,
  desc,
  link,
}: {
  image?: string
  title: string
  desc: string
  link: string
}) {
  const Site = `Marszy's Blog`
  const apiBase = 'https://og.loveur.life/api/og'

  // ✅ 核心逻辑：构建动态生成的封面 URL
  // 我们将标题、站点名和描述传给 API。如果传入了 image 路径，则将其作为背景。
  const generatedImage = `${apiBase}?title=${encodeURIComponent(title)}&site=${encodeURIComponent(Site)}&excerpt=${encodeURIComponent(desc)}${image ? `&image=${encodeURIComponent(image)}` : ''}`

  return (
    <Link
      href={link}
      target="_blank"
      rel="noreferrer"
      style={{
        display: 'block',
        borderRadius: 16,
        border: '1px solid rgba(150,150,150,0.25)',
        overflow: 'hidden',
        textDecoration: 'none',
        color: 'currentColor',
        userSelect: 'none',
        margin: '1.5rem 0', // 增加上下间距，让卡片在文章中更美观
      }}
    >
      {/* 这里改用了标准的 <img> 标签。
        因为 API 返回的是远程图片，使用 <img> 可以避免去修改 next.config.js 的繁琐配置。
      */}
      <img
        src={generatedImage}
        style={{
          margin: 0,
          width: '100%',
          aspectRatio: '1.9/1',
          objectFit: 'cover',
          borderBottom: '1px solid rgba(150,150,150,0.25)',
        }}
        alt="og"
      />
      <p
        style={{
          margin: '0.8rem 0.8rem 0.2rem',
          fontVariationSettings: '"wght" 550',
          fontWeight: 500,
        }}
      >
        {title}
      </p>
      <p
        style={{
          margin: '0.2rem 0.8rem 0.8rem',
          opacity: 0.8,
          fontSize: 14,
        }}
      >
        {desc}
      </p>
    </Link>
  )
}
