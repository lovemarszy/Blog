// components/open-graph.tsx
import Link from 'next/link'
import { signOgUrl } from '../lib/og-signer' // ✅ 引入签名工具

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

  // ✅ 核心修改：使用 URL 对象并进行签名，确保卡片图片不报 403
  const ogUrl = new URL(apiBase)
  ogUrl.searchParams.set('title', title)
  ogUrl.searchParams.set('site', Site)
  ogUrl.searchParams.set('excerpt', desc)
  if (image) ogUrl.searchParams.set('image', image)

  const generatedImage = signOgUrl(ogUrl)

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
        margin: '1.5rem 0',
      }}
    >
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
