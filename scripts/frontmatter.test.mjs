import assert from 'node:assert/strict'
import test from 'node:test'
import { parseFrontMatter } from '../lib/frontmatter.mjs'

test('article fields and Markdown body retain their original values', () => {
  const body = '\n# 正文\n\n---\n\n```yaml\n---\ntitle: example\n---\n```\n'
  const source = `---\ntitle: "你好: 世界"\ndate: 2026/01/03\ntags: [坐下聊聊, 书影音]\nimage:\ndescription: |\n  第一行\n  第二行\n---\n${body}`
  assert.deepEqual(parseFrontMatter(source), {
    data: {
      title: '你好: 世界',
      date: '2026/01/03',
      tags: ['坐下聊聊', '书影音'],
      image: null,
      description: '第一行\n第二行\n',
    },
    content: body,
  })
})

test('BOM and Windows line endings are supported without rewriting the body', () => {
  const body = '\r\n正文\r\n'
  assert.deepEqual(parseFrontMatter(`\uFEFF---\r\ntitle: Example\r\n---\r\n${body}`), {
    data: { title: 'Example' },
    content: body,
  })
})

test('plain Markdown and empty front matter remain valid', () => {
  const plain = '# 标题\n\n---\n\n正文\n'
  assert.deepEqual(parseFrontMatter(plain), { data: {}, content: plain })
  assert.deepEqual(parseFrontMatter('---\n# comment\n---\n正文'), {
    data: {},
    content: '正文',
  })
  assert.deepEqual(parseFrontMatter('---\ntitle: Example\n---'), {
    data: { title: 'Example' },
    content: '',
  })
})

test('indented delimiters inside multiline fields do not end the header', () => {
  assert.deepEqual(parseFrontMatter('---\ndescription: |\n  ---\n  text\n---\nbody'), {
    data: { description: '---\ntext\n' },
    content: 'body',
  })
})

test('broken headers report the filename instead of silently dropping content', () => {
  assert.throws(
    () => parseFrontMatter('---\ntitle: Example', 'post.md'),
    /post.md: missing closing/,
  )
  assert.throws(
    () => parseFrontMatter('---\ntitle: A\ntitle: B\n---\nbody', 'post.md'),
    /post.md: invalid YAML/,
  )
  assert.throws(() => parseFrontMatter('---\n- item\n---\nbody'), /must contain named fields/)
})

test('excessive YAML alias expansion is rejected', () => {
  const aliases = name => Array(10).fill(`*${name}`).join(', ')
  const source = `---\na: &a [0,0,0,0,0,0,0,0,0,0]\nb: &b [${aliases('a')}]\nc: &c [${aliases('b')}]\nd: [${aliases('c')}]\n---\nbody`
  assert.throws(() => parseFrontMatter(source), /invalid YAML front matter/)
})
