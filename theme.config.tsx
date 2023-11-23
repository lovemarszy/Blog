import CustomHead from '#components/custom-head'
import Link from 'next/link'
import { FaRss } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

const YEAR = new Date().getFullYear()

const NextraThemeConfig = {
  head: CustomHead,
  dateFormatter: (date: Date) => `${date.toDateString()}`,
  footer: (
    <div>
      <hr />
      <div className="grid auto-cols-min grid-flow-col gap-8 text-xl ss:gap-4">
        <a
          href="mailto:marszy@loveur.life"
          target="_blank"
          rel="noreferrer"
          aria-label="Email"
          className=""
        >
          <MdEmail />
        </a>
        <Link href="/feed.xml" target="_blank" rel="noreferrer" aria-label="RSS" className="">
          <FaRss />
        </Link>
      </div>
      <small className="mt-32 block text-p-light dark:text-inherit">
        <div>
          Modified from ⁣⁣⁣⁣
          <a href="https://github.com/aozaki-kuro/aozaki-next-blog" target="_blank" rel="noreferrer">Aozaki ⁣⁣⁣⁣</a>
        </div>
        <abbr
          title="This site and all its content are licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License."
          className="cursor-help"
        >
          CC BY-NC-SA 4.0
        </abbr>{' '}
        <time>{YEAR}</time> © Marszy
        <div className="float-right">[ Built with love ]</div>
      </small>
    </div>
  ),
}

export default NextraThemeConfig
