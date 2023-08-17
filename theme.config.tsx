const YEAR = new Date().getFullYear()

export default {
  footer: (
    <footer>
      <small className="mt-32 block text-p-light dark:text-inherit">
        <abbr
          title="This site and all its content are licensed under a Attribution-NonCommercial-ShareAlike 4.0 International License."
          className="cursor-help"
        >
          CC BY-NC-SA 4.0
        </abbr>{' '}
        <time>{YEAR}</time> © Marszy.
        <a href="/feed.xml">RSS</a>
      </small>
      <style jsx>{`
        footer {
          margin-top: 8rem;
        }
        a {
          float: right;
        }
      `}</style>
    </footer>
  ),
}
