/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://loveur.life',
  generateRobotsTxt: true,
  autoLastmod: true,
  generateIndexSitemap: true,
  changefreq: 'daily',
  priority: 1,
  exclude: ['/photography/*'],
}
