import 'typeface-roboto'
import Layout from "../components/layout";
import type { AppProps } from 'next/app';
import { createTheme, CssBaseline, ThemeProvider} from "@material-ui/core";
import {RecoilRoot, useRecoilState} from "recoil";
import Head from "next/head";
import React from "react";

const theme = createTheme();

function App(appProps: AppProps) {
  return (
    <>
      <CssBaseline/>
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <Head>
            <title>AnyCave</title>
          </Head>
          <Root {...appProps} />
        </RecoilRoot>
      </ThemeProvider>
    </>
  );
}

function Root({ Component, pageProps }: AppProps) {
  return <Layout>
    <Component {...pageProps} />
  </Layout>;
}

export default App
