export function signOgUrl(url: URL): string {
  const SECRET = process.env.OG_SIGNATURE_SECRET

  if (typeof window !== 'undefined') {
    return url.toString()
  }

  if (!SECRET) {
    console.error('❌ [OGIS] OG_SIGNATURE_SECRET is missing in environment variables!')
    return url.toString()
  }

  try {
    // 避免 Webpack 打包服务端 crypto。
    const crypto = eval('require')('crypto')

    // 参数排序和编码须与 OGIS 一致。
    const entries: Array<[string, string]> = []
    url.searchParams.forEach((value, key) => {
      if (key !== 'sig') entries.push([key, value])
    })
    entries.sort((a, b) => (a[0] < b[0] ? -1 : 1))

    const payload =
      entries
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&') || '__empty__'

    const sig = crypto.createHmac('sha256', SECRET).update(payload).digest('hex')

    const signedUrl = new URL(url.toString())
    signedUrl.searchParams.set('sig', sig)

    console.log(`✅ [OGIS] Signed URL generated for: ${url.searchParams.get('title')}`)

    return signedUrl.toString()
  } catch (err) {
    console.error('❌ [OGIS] Signing failed:', err)
    return url.toString()
  }
}
