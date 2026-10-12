import 'server-only'
import type { Metadata } from 'next'
import type { ContentMetadata } from './content-metadata'
import { signOgUrl } from './og-signer'
import { parseContentDate } from './content-date.mjs'

const site = "Marszy's Blog"

export function createMetadata(meta: ContentMetadata, pathname: string): Metadata {
  const title = meta.title || 'Untitled'
  const fullTitle = title === 'About' ? site : `${title} - ${site}`
  const description = meta.description || ''
  const url = new URL('https://og.loveur.life/api/og')
  url.searchParams.set('title', title)
  url.searchParams.set('site', site)
  url.searchParams.set('author', meta.author || 'Marszy')
  if (description) url.searchParams.set('excerpt', description)
  if (meta.tags?.length) url.searchParams.set('tag', meta.tags.join(','))
  const date = parseContentDate(meta.date)
  if (date) url.searchParams.set('date', date.toISOString().split('T')[0])
  if (meta.image) url.searchParams.set('image', meta.image)
  const image = signOgUrl(url)
  const canonical = `https://blog.loveur.life${pathname === '/' ? '' : pathname}`
  return {
    title: fullTitle,
    description,
    other: { title: fullTitle },
    alternates: { canonical, types: { 'application/rss+xml': '/feed.xml' } },
    openGraph: { title: fullTitle, description, images: [image], url: canonical, type: 'article' },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [image] },
  }
}
