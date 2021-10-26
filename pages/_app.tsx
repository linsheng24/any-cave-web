import 'typeface-roboto'
import Layout from "../components/layout";
import type { AppProps } from 'next/app';
import { createTheme, CssBaseline, ThemeProvider} from "@material-ui/core";
import {RecoilRoot, useRecoilState} from "recoil";
import {IsLogin} from "../states/atoms/main";
import useUser from "../states/hooks/use-user";

const theme = createTheme();

function App(appProps: AppProps) {
  return (
    <>
      <CssBaseline/>
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <Root {...appProps} />
        </RecoilRoot>
      </ThemeProvider>
    </>
  );
}

function Root({ Component, pageProps }: AppProps) {
  const { user } = useUser();
  if (user) {
    return <Layout>
      <Component {...pageProps} />
    </Layout>;
  } else {
    return <Component {...pageProps} />;
  }
}

export default App
