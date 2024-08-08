import { InstagramIcon, TwitterIcon, YoutubeIcon } from "@yamada-ui/lucide"
import {
  ButtonGroup,
  Divider,
  Flex,
  HStack,
  IconButton,
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
    <VStack alignItems="center" as="footer" gap="0">
      <Divider />
      <Flex
        w="full"
        justifyContent="space-between"
        alignItems="center"
        flexDirection="row"
        _container={[
          { maxW: "768px", css: { flexDirection: "column", gap: "sm" } },
        ]}
        maxW="6xl"
        px="md"
        py="lg"
      >
        <HStack gap="sm" py="2">
          <Image src="/favicon.svg" width={30} height={30} alt="Yamada UI" />
          <Text fontSize="lg">Yamada UI</Text>
        </HStack>
        <Flex gap="md">{items}</Flex>
        <ButtonGroup>
          <IconButton
            variant="ghost"
            borderRadius="full"
            icon={<TwitterIcon />}
          />
          <IconButton
            variant="ghost"
            borderRadius="full"
            icon={<YoutubeIcon />}
          />
          <IconButton
            variant="ghost"
            borderRadius="full"
            icon={<InstagramIcon />}
          />
        </ButtonGroup>
      </Flex>
    </VStack>
  )
}

export default FooterCentered
