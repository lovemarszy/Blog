// lib/og-signer.ts

export function signOgUrl(url: URL): string {
  // 强制读取环境变量
  const SECRET = process.env.OG_SIGNATURE_SECRET

  // 增加判定：如果是浏览器环境，直接返回（因为浏览器拿不到环境变量）
  if (typeof window !== 'undefined') {
    return url.toString()
  }

  // 如果在服务端但没拿到密钥，在控制台报错提醒
  if (!SECRET) {
    console.error('❌ [OGIS] OG_SIGNATURE_SECRET is missing in environment variables!')
    return url.toString()
  }

  try {
    // 使用 eval 避开 Webpack 对原生 crypto 的打包检查
    const crypto = eval('require')('crypto')

    // 1. 提取所有参数并排序（必须与 OGIS 端算法完全一致）
    const entries: Array<[string, string]> = []
    url.searchParams.forEach((value, key) => {
      if (key !== 'sig') entries.push([key, value])
    })
    entries.sort((a, b) => (a[0] < b[0] ? -1 : 1))

    // 2. 拼接 Payload
    const payload =
      entries
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&') || '__empty__'

    // 3. 计算 HMAC-SHA256 签名
    const sig = crypto.createHmac('sha256', SECRET).update(payload).digest('hex')

    // 4. 注入签名
    const signedUrl = new URL(url.toString())
    signedUrl.searchParams.set('sig', sig)

    // 调试：如果签名成功，在终端打印一下
    console.log(`✅ [OGIS] Signed URL generated for: ${url.searchParams.get('title')}`)

    return signedUrl.toString()
  } catch (err) {
    console.error('❌ [OGIS] Signing failed:', err)
    return url.toString()
  }
}
