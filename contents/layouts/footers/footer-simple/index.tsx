import type { FC } from "react"
import {
  Divider,
  Flex,
  HStack,
  Image,
  Link,
  Text,
  VStack,
} from "@yamada-ui/react"

const links = [
  { label: "Home", link: "#" },
  { label: "Contact", link: "#" },
  { label: "Privacy", link: "#" },
  { label: "Terms", link: "#" },
  { label: "About", link: "#" },
]

const FooterCentered: FC = () => {
  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      color="muted"
      onClick={(e) => e.preventDefault()}
    >
      {link.label}
    </Link>
  ))

  return (
    <VStack as="footer" gap="0" placeItems="center">
      <Divider />
      <Flex
        alignItems="center"
        flexDir={{ sm: "column" }}
        gap={{ sm: "sm" }}
        justifyContent="space-between"
        maxW="6xl"
        px="md"
        py="lg"
        w="full"
      >
        <HStack gap="sm">
          <Image src="/favicon.svg" alt="Yamada UI" height={30} width={30} />
          <Text fontSize="lg">Yamada UI</Text>
        </HStack>
        <HStack>{items}</HStack>
      </Flex>
    </VStack>
  )
}

export default FooterCentered
