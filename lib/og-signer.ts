// lib/og-signer.ts

/**
 * 终极安全签名工具
 * 解决 Webpack 报错并确保签名逻辑仅在服务端运行
 */
export function signOgUrl(url: URL): string {
  // 1. 获取密钥 (Vercel 环境变量或本地 .env.local)
  const SECRET = process.env.OG_SIGNATURE_SECRET

  // 2. 环境安全检查
  // 如果在浏览器端运行，或者没有配置密钥，则直接返回原 URL（不签名）
  if (typeof window !== 'undefined' || !SECRET) {
    // 如果你本地测试发现没签名，请检查 .env.local 是否填了 OG_SIGNATURE_SECRET
    return url.toString()
  }

  try {
    // 3. 绕过 Webpack 静态分析，动态引入 Node 模块
    const crypto = eval('require')('crypto')

    // 4. 参数归一化（逻辑必须与 ogis 项目严格一致）
    const entries: Array<[string, string]> = []
    url.searchParams.forEach((value, key) => {
      if (key !== 'sig') {
        entries.push([key, value])
      }
    })

    // 排序确保参数顺序一致，否则哈希值会变
    entries.sort((a, b) => (a[0] < b[0] ? -1 : 1))

    const payload =
      entries
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&') || '__empty__'

    // 5. 计算 HMAC-SHA256
    const sig = crypto.createHmac('sha256', SECRET).update(payload).digest('hex')

    // 6. 附加签名并返回
    const signedUrl = new URL(url.toString())
    signedUrl.searchParams.set('sig', sig)
    return signedUrl.toString()
  } catch (err) {
    console.error('OG Signing Error:', err)
    return url.toString()
  }
}
