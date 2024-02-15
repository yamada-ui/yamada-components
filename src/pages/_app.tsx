import type { AppProps } from "next/app";
import { UIProvider } from "@yamada-ui/react"

export default function App({ Component, pageProps }: AppProps) {
  return <UIProvider>
    <Component {...pageProps} />
  </UIProvider>;
}
