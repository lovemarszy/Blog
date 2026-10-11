'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  ['/', 'About'],
  ['/photos', 'Photos'],
  ['/links', 'Links'],
  ['/tags', 'Tags'],
  ['/posts', 'Posts'],
]

export default function Navigation() {
  const pathname = usePathname()
  return (
    <nav className="blog-navigation not-prose" aria-label="Main">
      {links.map(([href, title]) =>
        pathname === href ? (
          <span key={href} aria-current="page">
            {title}
          </span>
        ) : (
          <Link key={href} href={href}>
            {title}
          </Link>
        ),
      )}
    </nav>
  )
}
