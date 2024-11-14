import { Footer } from "@/components/Footer/Footer";
import { HeroBanner } from "@/components/HeroBanner/HeroBanner";
import { MainContent } from "@/components/MainContent/MainContent";

import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Nuances of Iframe</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="homepage">
        <HeroBanner />

        <MainContent />

        <Footer />
      </div>
    </>
  );
}
