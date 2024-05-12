import type { ThemeConfig } from "@yamada-ui/react"
import type { NextPage, NextPageWithOptions } from "next"
import type { AppProps } from "next/app"

declare module "next" {
  type NextPageWithOptions<Props = any, InitialProps = Props> = NextPage<
    Props,
    InitialProps
  > & {
    config?: ThemeConfig | ((asPath: string) => ThemeConfig | undefined)
  }
}

declare module "next/app" {
  type AppPropsWithOptions<Props = any> = Omit<AppProps<Props>, "Component"> & {
    Component: NextPageWithOptions<P>
  }
}
