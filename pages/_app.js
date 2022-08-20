
import '../styles/globals.css'
import React from "react";
import Script from "next/script";
import NextNProgress from "nextjs-progressbar";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <React.Fragment>
        <NextNProgress
          color="#E8F1F2"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true} />
        <Component {...pageProps} />
        <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
        <noscript>
          {/* eslint-disable @next/next/no-img-element */}
          <img
            src="https://queue.simpleanalyticscdn.com/noscript.gif"
            alt=""
            referrerPolicy="no-referrer-when-downgrade"
          />
        </noscript>
      </React.Fragment>
    </>
  )
}

export default MyApp
