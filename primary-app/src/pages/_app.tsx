import { GoogleTagManager } from "@next/third-parties/google";
import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="author" href="https://deepakkharah.com" />
        <title>
          Nuances of Iframe: The lessons from Contentstack Live Preview
        </title>
        <meta
          name="description"
          content="A companion application of the talk presented at React India 2024 - Remote Edition. The talk was about the journey of building a live preview feature for a headless CMS and what we learned along the way."
        />

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta
          property="og:title"
          content="Nuances of Iframe: The lessons from Contentstack Live Preview"
        />
        <meta
          property="og:description"
          content="A companion application of the talk presented at React India 2024 - Remote Edition. The talk was about the journey of building a live preview feature for a headless CMS and what we learned along the way."
        />
        <meta
          property="og:url"
          content="https://nuances-of-iframe-sec.deepakkharah.com"
        />
        <meta property="og:site_name" content="Deepak Kharah" />
        <meta
          property="og:image"
          content="https://nuances-of-iframe-sec.deepakkharah.com/images/og-image.png"
        />
        <meta property="og:image:alt" content="Nuances of Iframe" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@deepak_kharah" />
        <meta
          name="twitter:title"
          content="Nuances of Iframe: The lessons from Contentstack Live Preview"
        />
        <meta
          name="twitter:description"
          content="A companion application of the talk presented at React India 2024 - Remote Edition. The talk was about the journey of building a live preview feature for a headless CMS and what we learned along the way."
        />
        <meta
          name="twitter:image"
          content="https://nuances-of-iframe-sec.deepakkharah.com/images/og-image.png"
        />

        <link
          rel="icon"
          type="image/png"
          href="/images/favicon-96x96-light.png"
          sizes="96x96"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/images/favicon-light.svg"
          sizes="any"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          type="image/png"
          href="/images/favicon-96x96-dark.png"
          sizes="96x96"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/images/favicon-dark.svg"
          sizes="any"
          media="(prefers-color-scheme: dark)"
        />
      </Head>
      <Component {...pageProps} />
      <GoogleTagManager gtmId="G-H7BGDELH80" />
    </>
  );
}
