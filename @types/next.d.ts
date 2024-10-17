import type { ThemeConfig } from "@yamada-ui/react"
import type { NextPage, NextPageWithConfig } from "next"
import type { AppProps } from "next/app"

declare module "next" {
  type NextPageWithConfig<Props = any, InitialProps = Props> = {
    config?: ((asPath: string) => ThemeConfig | undefined) | ThemeConfig
  } & NextPage<Props, InitialProps>
}

declare module "next/app" {
  type AppPropsWithConfig<Props = any> = {
    Component: NextPageWithConfig<P>
  } & Omit<AppProps<Props>, "Component">
}
