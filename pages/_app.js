import '../styles/globals.css'
import Script from 'next/script'

import Layout from '../components/layout'

function MyApp({ Component, pageProps }) {
  return (
    <>
        <Layout>
          <Script src="https://cdn.veriff.me/sdk/js/1.1/veriff.min.js" strategy="beforeInteractive"/>
          <Script src="https://cdn.veriff.me/incontext/js/v1/veriff.js" strategy="beforeInteractive" />
        <Component {...pageProps} />
        </Layout>
    </>
    )
}

export default MyApp
