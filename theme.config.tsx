import React from 'react'
import type { NextraBlogTheme } from 'nextra-theme-blog'
import CustomHead from '#components/custom-head'
import Link from 'next/link'
import { FaRss } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

const YEAR = new Date().getFullYear()

const config: NextraBlogTheme = {
  head: CustomHead,
  dateFormatter: (date: Date) =>
    date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
  footer: (
    <div>
      <hr />
      <div className="grid auto-cols-min grid-flow-col gap-8 text-xl ss:gap-4">
        <a
          href="mailto:marszy@loveur.life"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Email"
          className="transition-colors hover:text-gray-600"
        >
          <MdEmail />
        </a>
        <Link
          href="/feed.xml"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="RSS"
          className="transition-colors hover:text-gray-600"
        >
          <FaRss />
        </Link>
      </div>
      <small className="mt-32 block text-p-light dark:text-inherit">
        <div className="mb-2">
          Modified from{' '}
          <a
            href="https://github.com/aozaki-kuro/aozaki-next-blog"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            Aozaki
          </a>
        </div>
        <abbr
          title="CC BY-NC-SA 4.0"
          className="cursor-help underline decoration-dotted underline-offset-4"
        >
          CC BY-NC-SA 4.0
        </abbr>{' '}
        <time>{YEAR}</time> © Marszy
        <div className="float-right">[ Built with love ]</div>
      </small>
    </div>
  ),
  readMore: 'Read More →',
}

export default config
