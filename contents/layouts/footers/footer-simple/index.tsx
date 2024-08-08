import {
  Divider,
  Flex,
  HStack,
  Image,
  Link,
  Text,
  VStack,
} from "@yamada-ui/react"
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
    <VStack as="footer" gap="0" placeItems="center">
      <Divider />
      <Flex
        w="full"
        justifyContent="space-between"
        alignItems="center"
        flexDir={{ sm: "column" }}
        gap={{ sm: "sm" }}
        px="md"
        py="lg"
        maxW="6xl"
      >
        <HStack gap="sm">
          <Image src="/favicon.svg" width={30} height={30} alt="Yamada UI" />
          <Text fontSize="lg">Yamada UI</Text>
        </HStack>
        <HStack>{items}</HStack>
      </Flex>
    </VStack>
  )
}

export default FooterCentered
