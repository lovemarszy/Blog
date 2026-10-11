import type { MDXComponents } from 'nextra/mdx-components'
import Link from 'next/link'
import { useMDXComponents as getThemeComponents } from 'nextra-theme-blog'
import ContentWrapper from './components/content-wrapper'

const components = getThemeComponents({
  wrapper: ContentWrapper,
  a: ({ href = '', children, ...props }) =>
    typeof href === 'string' && /https?:\/\//.test(href) ? (
      <a href={href} target="_blank" rel="noreferrer" {...props}>
        {children}
        <span className="sr-only select-none"> (opens in a new tab)</span>
      </a>
    ) : (
      <Link href={href} {...props}>
        {children}
      </Link>
    ),
})

export function useMDXComponents(overrides?: MDXComponents): MDXComponents {
  return { ...components, ...overrides }
}
