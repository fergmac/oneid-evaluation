import '../styles/globals.css'
import Script from 'next/script'


import Layout from '../components/layout'
import Header from '../components/header'

function MyApp({ Component, pageProps }) {
  return (
    <>
        <Layout>
          <Script src="https://cdn.veriff.me/sdk/js/1.1/veriff.min.js" strategy="beforeInteractive"/>
          <Script src="https://cdn.veriff.me/incontext/js/v1/veriff.js" strategy="beforeInteractive" />
          <Script src="https://static.vouched.id/widget/vouched-2.0.0.js" strategy="beforeInteractive" />
          <Script src="https://www.yoti.com/share/client/" strategy="beforeInteractive" />
          <Header />
          <Component {...pageProps} />
        </Layout>
    </>
    )
}

export default MyApp
