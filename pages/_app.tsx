import 'typeface-roboto'
import Layout from "../components/layout";
import type { AppProps } from 'next/app';
import {Box, createTheme, CssBaseline, ThemeProvider} from "@material-ui/core";
import {orange} from "@material-ui/core/colors";

const theme = createTheme();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CssBaseline/>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}
export default MyApp
