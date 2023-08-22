import '@/styles/globals.css'
import Layout from "@/components/layout/layout";
import Head from "next/head";

export default function App({Component, pageProps}) {
  return (
    <Layout>
      <Head>
        <title>Next Events</title>
        <meta name='description' content='an app to find local events to attend'/>
        <meat name="viewport" content="initial-scale=1.0, width=divice-width"/>
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}
