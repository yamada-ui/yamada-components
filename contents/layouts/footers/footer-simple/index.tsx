import { Flex, HStack, Image, Link, Text } from "@yamada-ui/react"
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
    <Flex
      w="full"
      borderTopWidth="1px"
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
      py="lg"
      px="md"
    >
      <HStack gap="sm">
        <Image src="/favicon.svg" width={30} height={30} alt="Yamada UI" />
        <Text fontSize="lg">Yamada UI</Text>
      </HStack>
      <Flex gap="md">{items}</Flex>
    </Flex>
  )
}

export default FooterCentered
