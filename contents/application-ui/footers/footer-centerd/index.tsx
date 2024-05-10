import {
  IconBrandInstagram,
  IconBrandX,
  IconBrandYoutube,
} from "@tabler/icons-react"
import { Box, Divider, Flex, IconButton, Image, Link } from "@yamada-ui/react"
import type { CFC } from "react"

const links = [
  { link: "#", label: "Home" },
  { link: "#", label: "Contact" },
  { link: "#", label: "Privacy" },
  { link: "#", label: "Terms" },
  { link: "#", label: "About" },
]

const FooterCentered: CFC = () => {
  const items = links.map((link) => (
    <Link key={link.label} href={link.link} onClick={(e) => e.preventDefault()}>
      {link.label}
    </Link>
  ))

  return (
    <Box>
      <Divider />
      <Flex
        mt="3"
        justifyContent="space-between"
        alignItems="center"
        flexDirection={{ base: "row", md: "column" }}
        gap={{ base: "initial", md: "2" }}
      >
        <Image src="/favicon.svg" width={30} height={30} alt="Yamada UI" />
        <Flex gap="2">{items}</Flex>
        <Flex gap="2">
          <IconButton borderRadius="full" icon={<IconBrandX />} />
          <IconButton borderRadius="full" icon={<IconBrandYoutube />} />
          <IconButton borderRadius="full" icon={<IconBrandInstagram />} />
        </Flex>
      </Flex>
    </Box>
  )
}

export default FooterCentered
