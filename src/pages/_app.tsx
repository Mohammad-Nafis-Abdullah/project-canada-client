import "~/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";

import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import { theme } from "~/styles/theme";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Head>
        <title>Quick Startup</title>
      </Head>

      <Component {...pageProps} />
    </MantineProvider>
  );
}
