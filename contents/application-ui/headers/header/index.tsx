import type { ThemeConfig, UsageTheme } from "@yamada-ui/react"
import { Box, HStack, Heading, extendTheme } from "@yamada-ui/react"
import type { FC } from "react"
import { LinkItem } from "./link-item"
import type { ComponentMetadata } from "types"

const links = [
  { link: "#", label: "Home" },
  { link: "#", label: "Contact" },
  { link: "#", label: "Privacy" },
  { link: "#", label: "Teams" },
  { link: "#", label: "About" },
]

const Header: FC = () => {
  return (
    <HStack as="header" justify="space-between">
      <Box>
        <Heading color="primary">Icon</Heading>
      </Box>
      <HStack>
        {links.map((item, index) => (
          <LinkItem key={index} {...{ item }} />
        ))}
      </HStack>
    </HStack>
  )
}

export default Header

export const metadata: ComponentMetadata = {
  title: "Simple Header",
  description: "This is simple header component.",
}

export const theme: UsageTheme = extendTheme({
  semantics: {
    colors: {
      primary: "pink.500",
    },
    colorSchemes: {
      primary: "pink",
    },
  },
})()
// export const theme: UsageTheme = {
//   semantics: {
//     colors: {
//       primary: "pink.500",
//     },
//     colorSchemes: {
//       primary: "pink",
//     },
//   },
// }

export const config: ThemeConfig = {}
