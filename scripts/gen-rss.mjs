import { promises as fs } from 'fs'
import matter from 'gray-matter'
import { join } from 'path'
import RSS from 'rss'

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
          return { ...frontmatter.data, slug: fileName.replace(/\.mdx?/, '') }
        }),
    )

    // 按日期降序排序
    posts.sort((a, b) => new Date(b.date) - new Date(a.date))

    posts.forEach(post => {
      // 🛠️ 智能处理标签：兼容 tag(字符串) 和 tags(数组)
      let tags = []
      if (Array.isArray(post.tags)) {
        tags = post.tags // 如果是标准数组格式 [a, b]
      } else if (typeof post.tag === 'string') {
        tags = post.tag.split(',').map(t => t.trim()) // 如果是旧式字符串 "a, b"
      }

      feed.item({
        title: post.title,
        url: `/posts/${post.slug}`,
        date: post.date,
        description: post.description,
        author: post.author || 'Marszy',
        categories: tags, // ✅ 使用处理好的 tags 数组
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
