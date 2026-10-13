import { parse } from 'yaml'

/**
 * @param {string} source
 * @param {string} [filename]
 * @returns {{ data: Record<string, unknown>, content: string }}
 */
export function parseFrontMatter(source, filename = 'Markdown content') {
  const text = source.charCodeAt(0) === 0xfeff ? source.slice(1) : source
  const firstLineEnd = text.indexOf('\n')
  if (firstLineEnd === -1 || text.slice(0, firstLineEnd).trimEnd() !== '---') {
    return { data: {}, content: text }
  }

  let lineStart = firstLineEnd + 1
  while (lineStart <= text.length) {
    const nextLine = text.indexOf('\n', lineStart)
    const lineEnd = nextLine === -1 ? text.length : nextLine
    if (/^---[ \t]*\r?$/.test(text.slice(lineStart, lineEnd))) {
      let data
      try {
        data = parse(text.slice(firstLineEnd + 1, lineStart), {
          maxAliasCount: 100,
          stringKeys: true,
          uniqueKeys: true,
        })
      } catch (cause) {
        throw new Error(`${filename}: invalid YAML front matter`, { cause })
      }

      if (data == null) data = {}
      if (
        typeof data !== 'object' ||
        Array.isArray(data) ||
        (Object.getPrototypeOf(data) !== Object.prototype && Object.getPrototypeOf(data) !== null)
      ) {
        throw new Error(`${filename}: front matter must contain named fields`)
      }

      return { data, content: nextLine === -1 ? '' : text.slice(nextLine + 1) }
    }
    if (nextLine === -1) break
    lineStart = nextLine + 1
  }

  throw new Error(`${filename}: missing closing front matter delimiter`)
}
