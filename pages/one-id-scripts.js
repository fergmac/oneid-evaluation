import Script from 'next/script'

export default function OneIDScripts() {
    return (
        <>
            <Script src="https://cdn.veriff.me/sdk/js/1.1/veriff.min.js" strategy="beforeInteractive"/>
            {/* <Script src="https://cdn.veriff.me/incontext/js/v1/veriff.js" strategy="beforeInteractive" /> */}
            <Script src="https://static.vouched.id/widget/vouched-2.0.0.js" strategy="beforeInteractive" />
            <Script src="https://www.yoti.com/share/client/" strategy="beforeInteractive" />
        </>
    )
}
