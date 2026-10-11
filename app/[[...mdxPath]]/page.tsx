import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '../../mdx-components'
import { createMetadata } from '../../lib/metadata'

export const generateStaticParams = generateStaticParamsFor('mdxPath')
export const dynamicParams = false

type Props = { params: Promise<{ mdxPath?: string[] }> }

export async function generateMetadata({ params }: Props) {
  const { mdxPath } = await params
  const { metadata } = await importPage(mdxPath)
  return createMetadata(metadata, mdxPath?.length ? `/${mdxPath.join('/')}` : '/')
}

const Wrapper = getMDXComponents().wrapper!
const pageHeadings = getMDXComponents({
  h2: props => <h2 {...props} />,
  h3: props => <h3 {...props} />,
  h4: props => <h4 {...props} />,
  h5: props => <h5 {...props} />,
  h6: props => <h6 {...props} />,
})

export default async function Page(props: Props) {
  const params = await props.params
  const { default: MDXContent, toc, metadata, sourceCode } = await importPage(params.mdxPath)
  const hideHeadingLinks = !params.mdxPath?.length || params.mdxPath.join('/') === 'links'
  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      <MDXContent
        {...props}
        params={params}
        components={hideHeadingLinks ? pageHeadings : undefined}
      />
    </Wrapper>
  )
}
