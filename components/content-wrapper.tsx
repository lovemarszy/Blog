import type { ReactNode } from 'react'
import Link from 'next/link'
import Navigation from './navigation'
import Footer from './footer'
import type { ContentMetadata } from '../lib/content-metadata'

export default function ContentWrapper({
  children,
  metadata,
}: {
  children: ReactNode
  metadata: ContentMetadata
}) {
  const isPost = metadata.type !== 'page' && metadata.type !== 'posts'
  const tags = metadata.tags || []
  return (
    <>
      <h1>{metadata.title}</h1>
      {isPost ? (
        <div className="blog-post-meta not-prose">
          <div className="blog-post-details">
            {metadata.author}
            {metadata.author && metadata.date && ','}
            {metadata.date && (
              <time dateTime={new Date(metadata.date).toISOString()}>
                {new Date(metadata.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            )}
            {tags.length > 0 && <span className="px-1">•</span>}
            {tags.map(tag => (
              <Link className="blog-tag" key={tag} href={`/tags/${tag}`}>
                {tag}
              </Link>
            ))}
          </div>
          <Link href="/posts">Back</Link>
        </div>
      ) : (
        <Navigation />
      )}
      {children}
      <Footer />
    </>
  )
}
