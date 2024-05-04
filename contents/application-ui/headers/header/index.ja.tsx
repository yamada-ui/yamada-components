import type { UsageTheme } from "@yamada-ui/react"
import { Box, HStack, Heading, extendTheme } from "@yamada-ui/react"
import type { CFC } from "react"
import { LinkItem } from "./link-item.ja"
import type { ComponentMetadata } from "types"

const links = [
  { link: "#", label: "ホーム" },
  { link: "#", label: "お問合せ" },
  { link: "#", label: "プライバシー" },
  { link: "#", label: "チームズ" },
  { link: "#", label: "について" },
]

const Header: CFC = () => {
  return (
    <HStack as="header" justify="space-between">
      <Box>
        <Heading color="banner">アイコン</Heading>
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

export const theme: UsageTheme = extendTheme({
  semantics: {
    colors: {
      banner: "#9d38a0",
    },
  },
})()

export const metadata: ComponentMetadata = {
  title: "シンプルなヘッダー",
  description: "これはシンプルなヘッダーコンポーネントです",
}
