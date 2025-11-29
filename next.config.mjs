/** @type {import('next').NextConfig} */
import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-blog',
  themeConfig: './theme.config.tsx',
  staticImage: true,
})

const securityHeaders = [
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

export default withNextra({
  reactStrictMode: true,
  cleanDistDir: true,
  images: {
    // ✅ 优化：使用新版配置，开启 Vercel 图片优化
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.loveur.life',
        pathname: '/**',
      },
    ],
  },
  eslint: {
    // 忽略构建时的 Lint 错误，防止部署失败
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
  async redirects() {
    return [
      {
        source: '/posts/kanaut-nishe-goods-1',
        destination: '/posts/kanaut-nishe-merch',
        permanent: true,
      },
      { source: '/blog/:slug*', destination: '/posts/:slug*', permanent: true },
      { source: '/portfoilo/:slug*', destination: '/photography/:slug*', permanent: true },
      { source: '/about', destination: '/', permanent: true },
      { source: '/desk-new-layout', destination: '/posts/new-desktop-layout', permanent: true },
      {
        source: '/bladerunner-revisit',
        destination: '/posts/bladerunner-revisit',
        permanent: true,
      },
    ]
  },
})
