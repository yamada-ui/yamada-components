import type { UsageTheme } from "@yamada-ui/react"
import { Box, HStack, Heading, extendTheme } from "@yamada-ui/react"
import type { CFC } from "react"
import { LinkItem } from "./link-item"
import type { ComponentMetadata } from "types"

const links = [
  { link: "#", label: "Home" },
  { link: "#", label: "Contact" },
  { link: "#", label: "Privacy" },
  { link: "#", label: "Teams" },
  { link: "#", label: "About" },
]

const Header: CFC = ({ metadata }) => {
  console.log(metadata)
  return (
    <HStack as="header" justify="space-between">
      <Box>
        <Heading color="banner">Icon</Heading>
      </Box>
      <HStack>
        {links.map((item, index) => (
          <LinkItem key={index} {...{ item }} />
        ))}
      </HStack>
    </HStack>
  )
}

export const theme: UsageTheme = extendTheme({
  semantics: {
    colors: {
      banner: "#9d38a0",
    },
  },
})()

export default Header

export const metadata: ComponentMetadata = {
  title: "Simple Header",
  description: "This is simple header component.",
}
