import type { FC } from "react"
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
    <VStack as="footer" alignItems="center" gap="0">
      <Divider />
      <Flex
        alignItems="center"
        flexDirection={{ md: "column" }}
        gap={{ md: "sm" }}
        justifyContent="space-between"
        maxW="6xl"
        px="md"
        py="lg"
        w="full"
      >
        <HStack gap="sm" py="2">
          <Image src="/favicon.svg" alt="Yamada UI" height={30} width={30} />
          <Text fontSize="lg">Yamada UI</Text>
        </HStack>
        <HStack>{items}</HStack>
        <ButtonGroup gap="xs">
          <IconButton
            variant="ghost"
            icon={<TwitterIcon fontSize="2xl" />}
            rounded="full"
          />
          <IconButton
            variant="ghost"
            icon={<YoutubeIcon fontSize="2xl" />}
            rounded="full"
          />
          <IconButton
            variant="ghost"
            icon={<InstagramIcon fontSize="2xl" />}
            rounded="full"
          />
        </ButtonGroup>
      </Flex>
    </VStack>
  )
}

export default FooterCentered
