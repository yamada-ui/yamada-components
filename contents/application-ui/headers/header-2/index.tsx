import { Box, HStack, Heading, Link } from "@yamada-ui/react"
import type { FC } from "react"
import type { ComponentMetadata } from "types"

const Header2: FC = () => {
  return (
    <HStack as="header" justify="space-between">
      <Box>
        <Heading>Icon</Heading>
      </Box>
      <HStack>
        <Link href="/">Link</Link>
        <Link href="/">Link</Link>
        <Link href="/">Link</Link>
        <Link href="/">Link</Link>
        <Link href="/">Link</Link>
      </HStack>
    </HStack>
  )
}

export default Header2

export const metadata: ComponentMetadata = {
  title: "Simple Header1",
  description: "This is simple header component.",
}
