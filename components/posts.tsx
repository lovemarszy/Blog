import Link from 'next/link'
import { getPagesUnderRoute } from 'nextra/context'

interface FrontMatter {
  date?: string
  title?: string
}

interface Page {
  route: string
  name: string
  meta?: { title?: string }
  frontMatter?: FrontMatter
}

const BlogIndex = () => {
  const pages = getPagesUnderRoute('/posts')

  // Read the page map during rendering, after Nextra initializes its context.
  const sortedPages = pages.sort((a: Page, b: Page) => {
    const dateA = new Date(a.frontMatter?.date || '').getTime()
    const dateB = new Date(b.frontMatter?.date || '').getTime()

    // Check if dateA or dateB is NaN (invalid date)
    if (isNaN(dateA) || isNaN(dateB)) {
      throw new Error('Invalid date format in frontMatter')
    }

    return dateB - dateA
  })
  return sortedPages.map((page: Page) => {
    const frontMatter = page.frontMatter || {}
    const title = page.meta?.title || frontMatter.title || page.name
    const date = new Date(frontMatter.date || '').toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })

    return (
      <div key={page.route}>
        <Link
          href={page.route}
          className="flex items-baseline text-2xl font-semibold text-inherit !no-underline"
        >
          <h3 className="font-variation-500 my-[0.3rem] mr-4 flex-1 text-[1.1rem] font-medium text-zinc-900 dark:text-gray-100">
            {title}
          </h3>
          <time className="date shrink-0 whitespace-nowrap text-sm text-gray-400">{date}</time>
        </Link>
      </div>
    )
  })
}

export default BlogIndex
