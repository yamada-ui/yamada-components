import type { ThemeConfig } from "@yamada-ui/react"
import type { NextPage, NextPageWithConfig } from "next"
import type { AppProps } from "next/app"

declare module "next" {
  type NextPageWithConfig<Props = any, InitialProps = Props> = NextPage<
    Props,
    InitialProps
  > & {
    config?: ThemeConfig | ((asPath: string) => ThemeConfig | undefined)
  }
}

declare module "next/app" {
  type AppPropsWithConfig<Props = any> = Omit<AppProps<Props>, "Component"> & {
    Component: NextPageWithConfig<P>
  }
}
