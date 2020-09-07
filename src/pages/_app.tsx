import React from 'react'
import { AppProps } from 'next/app'
import CssBaseline from '@material-ui/core/CssBaseline'
import Head from 'next/head'
import Providers from '../providers'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Providers>
      <Head>
        <title>Vnda Ecommerce</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <CssBaseline />
      <Component {...pageProps} />
    </Providers>
  )
}

export default MyApp
