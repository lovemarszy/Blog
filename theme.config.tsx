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
        <abbr
          title="This site and all its content are licensed under a Attribution-NonCommercial-ShareAlike 4.0 International License."
          className="cursor-help"
        >
          <a
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh"
            target="_blank"
            rel="noopener noreferrer"
          >
            CC BY-NC-SA 4.0
          </a>
        </abbr>{' '}
        <time>{YEAR}</time> © Marszy
        <div className="float-right">[ Built with love ]</div>
      </small>
    </div>
  ),
}

export default NextraThemeConfig
