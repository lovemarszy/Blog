import { promises as fs } from 'fs'
import matter from 'gray-matter'
import { join } from 'path'
import RSS from 'rss'
import { marked } from 'marked'

const msgError = '\x1b[0m[\x1b[31m ERROR \x1b[0m]'
const msgDone = '\x1b[0m[\x1b[32m DONE \x1b[0m]'

async function generate() {
  try {
    const feed = new RSS({
      title: "Marszy's Blog",
      site_url: 'https://blog.loveur.life',
      feed_url: 'https://blog.loveur.life/feed.xml',
      language: 'zh-CN',
    })

    const dirPath = join('./pages/posts')
    const files = await fs.readdir(dirPath)

    const posts = await Promise.all(
      files
        .filter(fileName => !fileName.startsWith('index.') && /\.(md|mdx)$/.test(fileName))
        .map(async fileName => {
          const content = await fs.readFile(join(dirPath, fileName))
          const frontmatter = matter(content)
          return {
            ...frontmatter.data,
            content: frontmatter.content,
            slug: fileName.replace(/\.mdx?/, ''),
          }
        }),
    )
    posts.sort((a, b) => new Date(b.date) - new Date(a.date))

    posts.forEach(post => {
      let tags = []
      if (Array.isArray(post.tags)) {
        tags = post.tags
      } else if (typeof post.tag === 'string') {
        tags = post.tag.split(',').map(t => t.trim())
      }
      let htmlContent = marked.parse(post.content || '')
      if (post.image) {
        htmlContent =
          `<img src="${post.image}" alt="${post.title}" style="max-width:100%; display:block; margin-bottom: 20px;" />` +
          htmlContent
      }

      feed.item({
        title: post.title,
        url: `/posts/${post.slug}`,
        date: post.date,
        description: post.description,
        author: post.author || 'Marszy',
        categories: tags,
        custom_elements: [{ 'content:encoded': htmlContent }],
      })
    })

    await fs.writeFile('./public/feed.xml', feed.xml({ indent: true }))
    console.log(msgDone, 'RSS feed generated successfully!')
  } catch (error) {
    console.error(msgError, 'Failed to generate RSS feed:', error)
    process.exit(1)
  }
}

generate()
