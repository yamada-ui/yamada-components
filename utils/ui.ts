import type { ThemeConfig } from "@yamada-ui/react"

export const getComponentConfig = (asPath: string): ThemeConfig | undefined => {
  const paths = asPath.replace(/^\//, "").split("/")

  if (paths.length < 3) return

  return {
    loading: {
      screen: {
        initialState: true,
      },
    },
  }
}
