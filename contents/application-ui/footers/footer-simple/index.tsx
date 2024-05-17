import { Box, Divider, Flex, HStack, Image, Link, Text } from "@yamada-ui/react"
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
        py="lg"
        px="md"
        maxW="6xl"
        mx="auto"
      >
        <HStack gap="sm">
          <Image src="/favicon.svg" width={30} height={30} alt="Yamada UI" />
          <Text fontSize="lg">Yamada UI</Text>
        </HStack>
        <Flex gap="md">{items}</Flex>
      </Flex>
    </Box>
  )
}

export default FooterCentered
