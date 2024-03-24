import { Box, HStack, Heading, Link } from "@yamada-ui/react"
import type { FC } from "react"

const Header2: FC = () => {
  return (
    <HStack as="header" justify="space-between">
      <Box>
        <Heading>アイコン</Heading>
      </Box>
      <HStack>
        <Link href="/">リンク</Link>
        <Link href="/">リンク</Link>
        <Link href="/">リンク</Link>
        <Link href="/">リンク</Link>
        <Link href="/">リンク</Link>
      </HStack>
    </HStack>
  )
}

export default Header2

export const metadata = {
  title: "Simple Header1",
  category: "headers",
  canvas: {
    center: true,
    maxWidth: 420,
  },
}
