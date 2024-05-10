import { Box, HStack, Heading, Link } from "@yamada-ui/react"
import type { FC } from "react"

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
