import { extendTheme } from "@yamada-ui/react"

const theme = extendTheme({
  components: {
    Menu: {
      baseStyle: {
        groupLabel: {
          fontSize: "xs",
          fontWeight: "medium",
        },
      },
    },
  },
})()

export default theme
