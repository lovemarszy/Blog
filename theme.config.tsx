import CustomHead from '#components/custom-head'
import Link from 'next/link'
import { FaRss } from 'react-icons/fa'  // 只保留 RSS 图标

const YEAR = new Date().getFullYear()

const NextraThemeConfig = {
  head: CustomHead,

  dateFormatter: (date: Date) => `${date.toDateString()}`,

  footer: (
    <div>
      <hr />
      <div className="grid auto-cols-min grid-flow-col gap-8 text-xl ss:gap-4">
        <Link href="https://loveur.life/feed.xml" target="_blank" rel="noreferrer" aria-label="RSS" className="">
          <FaRss />
        </Link>
      </div>
      <small className="mt-32 block text-p-light dark:text-inherit">
        <abbr
          title="This site and all its content are licensed under a Attribution-NonCommercial-ShareAlike 4.0 International License."
          className="cursor-help"
        >
          CC BY-NC-SA 4.0
        </abbr>{' '}
        <time>{YEAR}</time> © Marszy.
        <div className="float-right">[ Marszy ]</div>
      </small>
    </div>
  ),
}

export default NextraThemeConfig
