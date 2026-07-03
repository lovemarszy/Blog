import { promises as fs } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const postsDir = join(process.cwd(), 'pages/posts')

const isValidDate = value => {
  if (!value) return false
  const date = new Date(value)
  return !Number.isNaN(date.getTime())
}

const getTags = data => {
  if (Array.isArray(data.tags)) return data.tags
  if (typeof data.tag === 'string') return [data.tag]
  return []
}

const validate = async () => {
  const files = (await fs.readdir(postsDir)).filter(file => /\.mdx?$/.test(file))
  const errors = []

  for (const file of files) {
    const content = await fs.readFile(join(postsDir, file), 'utf8')
    const { data } = matter(content)
    const prefix = `pages/posts/${file}`

    if (typeof data.title !== 'string' || data.title.trim() === '') {
      errors.push(`${prefix}: missing title`)
    }

    if (!isValidDate(data.date)) {
      errors.push(`${prefix}: missing or invalid date`)
    }

    if (typeof data.description !== 'string' || data.description.trim() === '') {
      errors.push(`${prefix}: missing description`)
    }

    const tags = getTags(data)
    if (tags.length === 0 || tags.some(tag => typeof tag !== 'string' || tag.trim() === '')) {
      errors.push(`${prefix}: missing tag/tags`)
    }
  }

  if (errors.length > 0) {
    console.error('Post metadata validation failed:')
    errors.forEach(error => console.error(`- ${error}`))
    process.exit(1)
  }

  console.log(`Post metadata validation passed for ${files.length} posts.`)
}

validate().catch(error => {
  console.error('Post metadata validation failed:', error)
  process.exit(1)
})
