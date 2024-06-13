import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import {
  UIProvider,
  createColorModeManager,
  createThemeSchemeManager,
  merge,
  runIfFunc,
} from "@yamada-ui/react"
import type { AppPropsWithConfig } from "next/app"
import { Inter } from "next/font/google"
import Head from "next/head"
import { type FC } from "react"
import { I18nProvider } from "contexts/i18n-context"
import { theme, config } from "theme"

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext"],
  style: "normal",
  display: "block",
})

const App: FC<AppPropsWithConfig> = ({ Component, pageProps, router }) => {
  const { cookies } = pageProps
  const colorModeManager = createColorModeManager("ssr", cookies)
  const themeSchemeManager = createThemeSchemeManager("ssr", cookies)
  const pageConfig = runIfFunc(Component.config, router.asPath)

  const computedConfig = pageConfig ? merge(config, pageConfig) : config

  return (
    <>
      <Head>
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <title>Yamada Components</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <UIProvider
        theme={theme}
        config={computedConfig}
        colorModeManager={colorModeManager}
        themeSchemeManager={themeSchemeManager}
      >
        <I18nProvider>
          <Component {...{ ...pageProps, inter }} />
        </I18nProvider>
      </UIProvider>

      <SpeedInsights />
      <Analytics />
    </>
  )
}

export default App
