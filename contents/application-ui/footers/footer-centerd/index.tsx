import {
  Box,
  Divider,
  Flex,
  HStack,
  IconButton,
  Image,
  Link,
  Text,
} from "@yamada-ui/react"
import { Instagram, Twitter, Youtube } from "lucide-react"
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
    <Box pt="4xl">
      <Divider />
      <Flex
        justifyContent="space-between"
        alignItems="center"
        flexDirection={{ base: "row", md: "column" }}
        gap={{ base: "initial", md: "sm" }}
        p="md"
      >
        <HStack gap="sm">
          <Image src="/favicon.svg" width={30} height={30} alt="Yamada UI" />
          <Text fontSize="lg">Yamada UI</Text>
        </HStack>
        <Flex gap="md">{items}</Flex>
        <Flex gap="xs">
          <IconButton variant="ghost" borderRadius="full" icon={<Twitter />} />
          <IconButton variant="ghost" borderRadius="full" icon={<Youtube />} />
          <IconButton
            variant="ghost"
            borderRadius="full"
            icon={<Instagram />}
          />
        </Flex>
      </Flex>
    </Box>
  )
}

export default FooterCentered