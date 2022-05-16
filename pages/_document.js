import Document, { Head, Html, Main, NextScript } from 'next/document';
import OneIDScripts from '../components/oneIDScripts';
class MyDocument extends Document {
    render() {
        return <Html lang="en" >
            <Head>
                {/* <Link rel="preload" href="/font/myfont.pff" as="font" crossOrigin="anonymous"></Link> */}
            </Head>
            <body>
                <Main></Main>
                <NextScript />
                <OneIDScripts />
            </body>
        </Html>
    }
}

export default MyDocument;
