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
        _container={[
          {
            maxW: "500px",
            css: {
              flexDirection: "column",
              gap: "sm",
            },
          },
        ]}
        px="md"
        py="lg"
        maxW="6xl"
      >
        <HStack gap="sm">
          <Image src="/favicon.svg" width={30} height={30} alt="Yamada UI" />
          <Text fontSize="lg">Yamada UI</Text>
        </HStack>
        <Flex gap="md">{items}</Flex>
      </Flex>
    </VStack>
  )
}

export default FooterCentered
