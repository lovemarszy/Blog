import Link from 'next/link'
import { getAllPosts } from '../lib/posts'

const BlogIndex = () => {
  const sortedPages = getAllPosts()
  return sortedPages.map(page => {
    const title = page.title
    const date = new Date(page.date || '').toLocaleDateString('zh-CN', {
      timeZone: 'UTC',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })

    return (
      <div key={`/posts/${page.slug}`}>
        <Link
          href={`/posts/${page.slug}`}
          className="flex items-baseline text-2xl font-semibold text-inherit !no-underline"
        >
          <h3 className="font-variation-500 my-[0.3rem] mr-4 flex-1 text-[1.1rem] font-medium text-zinc-900 dark:text-gray-100">
            {title}
          </h3>
          <time className="date shrink-0 text-sm whitespace-nowrap text-gray-400">{date}</time>
        </Link>
      </div>
    )
  })
}

export default BlogIndex
