import CustomHead from '#components/custom-head'
import Link from 'next/link'
import { FaRss } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md' // Using the envelope icon for email

// Fixed name and paths

// Year
const YEAR = new Date().getFullYear()

// Nextra blog theme config
const NextraThemeConfig = {
  // <Head>
  head: CustomHead,

  // Date format
  dateFormatter: (date: Date) => `${date.toDateString()}`,

  // <Footer/>
  footer: (
    <div>
      <hr />
      <div className="grid auto-cols-min grid-flow-col gap-8 text-xl ss:gap-4">
        {/* Swap the positions of RSS and Email links */}
        {/* Add the email link */}
        <a
          href="mailto:marszybox@gmail.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Email"
          className=""
        >
          <MdEmail />
        </a>
        {/* Keep the RSS link */}
        <Link href="/feed.xml" target="_blank" rel="noreferrer" aria-label="RSS" className="">
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
        <div className="float-right">[ Built with love ]</div>
      </small>
    </div>
  ),
}

export default NextraThemeConfig
