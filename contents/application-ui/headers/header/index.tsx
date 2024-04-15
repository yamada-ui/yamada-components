import { Box, HStack, Heading } from "@yamada-ui/react"
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
        <Heading>Icon</Heading>
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
