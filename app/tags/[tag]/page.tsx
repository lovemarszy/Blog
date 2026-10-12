import { Fragment } from 'react'
import Link from 'next/link'
import ContentWrapper from '../../../components/content-wrapper'
import { getAllPosts, getAllTags } from '../../../lib/posts'
import { createMetadata } from '../../../lib/metadata'

export const dynamicParams = false
export function generateStaticParams() {
  return getAllTags().map(tag => ({ tag }))
}

type Props = { params: Promise<{ tag: string }> }

export async function generateMetadata({ params }: Props) {
  const tag = decodeURIComponent((await params).tag)
  return createMetadata({ title: tag, type: 'page' }, `/tags/${tag}`)
}

export default async function TagPage({ params }: Props) {
  const tag = decodeURIComponent((await params).tag)
  const posts = getAllPosts().filter(post => post.tags.includes(tag))
  const title = tag
  return (
    <ContentWrapper metadata={{ title, type: 'page' }}>
      <div className="blog-tag-page">
        <div className="mb-8">
          <Link
            href="/tags"
            className="cursor-pointer text-sm font-medium text-gray-500 !no-underline transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ← Back to Tags
          </Link>
        </div>

        <div className="mt-8">
          {posts.map((post, index) => (
            <Fragment key={post.slug}>
              {index > 0 && <hr className="!my-8" />}
              <div className="group">
                <h3 className="mb-2 text-xl font-bold">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="no-underline decoration-gray-400 decoration-2 underline-offset-4 hover:underline"
                  >
                    {post.title}
                  </Link>
                </h3>
                <div className="mb-2 text-sm text-gray-500">
                  {post.date &&
                    new Date(post.date).toLocaleDateString('zh-CN', {
                      timeZone: 'UTC',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                </div>
                <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                  {post.description}
                </p>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </ContentWrapper>
  )
}
