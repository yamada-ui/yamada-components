import { Box, Divider, Flex, Link } from "@yamada-ui/react"
import type { FC } from "react"

const links = [
  { link: "#", label: "Home" },
  { link: "#", label: "Contact" },
  { link: "#", label: "Privacy" },
  { link: "#", label: "Terms" },
  { link: "#", label: "About" },
]

const FooterCentered: FC = () => {
  const items = links.map((link) => (
    <Link key={link.label} href={link.link} onClick={(e) => e.preventDefault()}>
      {link.label}
    </Link>
  ))

  return (
    <Box>
      <Divider />
      <Flex mt="3" justifyContent="space-between">
        logo
        <Flex gap="1.5">{items}</Flex>
        icons
      </Flex>
    </Box>
  )
}

export default FooterCentered

export const metadata = {
  title: "Footer with Centered links",
  category: "footers",
  canvas: {
    center: true,
    maxWidth: 420,
  },
}
