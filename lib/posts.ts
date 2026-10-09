import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'pages/posts')
export const getTags = (frontMatter: any) => {
  const tags = new Set<string>()
  if (Array.isArray(frontMatter.tags)) {
    frontMatter.tags.forEach((t: string) => tags.add(t))
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
      const { data } = matter(fileContents)

      return {
        slug: fileName.replace(/\.mdx?$/, ''),
        title: data.title || fileName,
        date: data.date ? new Date(data.date).toISOString() : null,
        description: data.description || '',
        tags: getTags(data),
        ...data,
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
