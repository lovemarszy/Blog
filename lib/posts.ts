import 'server-only'
import fs from 'fs'
import path from 'path'
import { parseFrontMatter } from './frontmatter.mjs'
import { parseContentDate } from './content-date.mjs'

const postsDirectory = path.join(process.cwd(), 'content/posts')
export const getTags = (frontMatter: Record<string, unknown>) => {
  const tags = new Set<string>()
  if (Array.isArray(frontMatter.tags)) {
    frontMatter.tags.forEach(t => {
      if (typeof t === 'string') tags.add(t)
    })
  } else if (typeof frontMatter.tag === 'string') {
    tags.add(frontMatter.tag)
  }
  return Array.from(tags)
}
export const getAllPosts = () => {
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames
    .filter(fileName => /\.mdx?$/.test(fileName))
    .map(fileName => {
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = parseFrontMatter(fileContents, fullPath)
      const date = typeof data.date === 'string' || data.date instanceof Date ? data.date : null

      return {
        ...data,
        slug: fileName.replace(/\.mdx?$/, ''),
        title: typeof data.title === 'string' && data.title ? data.title : fileName,
        date: parseContentDate(date)?.toISOString() || null,
        description: typeof data.description === 'string' ? data.description : '',
        tags: getTags(data),
      }
    })
    .sort((a, b) => {
      if (!a.date) return 1
      if (!b.date) return -1
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
}
export const getAllTags = () => {
  const posts = getAllPosts()
  const tags = new Set<string>()
  posts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag))
  })
  return Array.from(tags)
}
