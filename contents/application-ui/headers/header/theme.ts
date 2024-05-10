import type { UsageTheme } from "@yamada-ui/react"
import { extendTheme } from "@yamada-ui/react"

export const theme: UsageTheme = extendTheme({
  semantics: {
    colors: {
      banner: "#9d38a0",
    },
  },
})()

export default theme
