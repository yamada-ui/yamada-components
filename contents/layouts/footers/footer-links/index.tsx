import { InstagramIcon, TwitterIcon, YoutubeIcon } from "@yamada-ui/lucide"
import {
  Text,
  Flex,
  IconButton,
  Image,
  Link,
  VStack,
  HStack,
  Divider,
  SimpleGrid,
  ButtonGroup,
  List,
  ListItem,
} from "@yamada-ui/react"
import type { FC } from "react"

const data = [
  {
    title: "About",
    links: [
      { label: "Features", link: "#" },
      { label: "Pricing", link: "#" },
      { label: "Support", link: "#" },
      { label: "Forums", link: "#" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "Contribute", link: "#" },
      { label: "Media assets", link: "#" },
      { label: "Changelog", link: "#" },
      { label: "Releases", link: "#" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Join Discord", link: "#" },
      { label: "Follow on Twitter", link: "#" },
      { label: "Email newsletter", link: "#" },
      { label: "GitHub discussions", link: "#" },
    ],
  },
]

const FooterLinks: FC = () => {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <ListItem key={index}>
        <Link
          href={link.link}
          onClick={(event) => event.preventDefault()}
          fontSize="sm"
        >
          {link.label}
        </Link>
      </ListItem>
    ))

    return (
      <List gap="md" key={group.title}>
        <ListItem>
          <Text fontSize="lg" fontWeight="semibold">
            {group.title}
          </Text>
        </ListItem>
        <ListItem>
          <List gap="xs">{links}</List>
        </ListItem>
      </List>
    )
  })

  return (
    <VStack
      alignItems="center"
      as="footer"
      gap="0"
      bg={["blackAlpha.100", "blackAlpha.500"]}
    >
      <Divider borderColor={["blackAlpha.300", "border"]} />
      <VStack gap="0" py="xl" px="md" placeItems="center" maxW="6xl">
        <Flex
          justifyContent={{ base: "space-between", md: "center" }}
          alignItems="center"
          flexDir={{ md: "column" }}
          px="md"
          py="lg"
          w="full"
        >
          <VStack maxW="xs">
            <HStack gap="sm" justifyContent={{ base: "start", md: "center" }}>
              <Image
                src="/favicon.svg"
                width={30}
                height={30}
                alt="Yamada UI"
              />
              <Text fontSize="lg">Yamada UI</Text>
            </HStack>
            <Text fontSize="sm" color="GrayText" textAlign={{ md: "center" }}>
              Unleash the Power of Styling, Animation, and Flexibility in React
              Apps
            </Text>
          </VStack>
          <SimpleGrid columns={3} display={{ base: "grid", md: "none" }}>
            {groups}
          </SimpleGrid>
        </Flex>
        <Divider borderColor={["blackAlpha.300", "border"]} />
        <Flex
          flexDir={{ md: "column" }}
          placeItems="center"
          justifyContent="space-between"
          w="full"
          px="md"
          py="lg"
          gap={{ md: "md" }}
        >
          <Text color="GrayText" fontSize="sm">
            © 2024 Yamada UI. All rights reserved.
          </Text>
          <ButtonGroup gap="xs">
            <IconButton
              variant="ghost"
              borderRadius="full"
              icon={<TwitterIcon size="2xl" />}
            />
            <IconButton
              variant="ghost"
              borderRadius="full"
              icon={<YoutubeIcon size="2xl" />}
            />
            <IconButton
              variant="ghost"
              borderRadius="full"
              icon={<InstagramIcon size="2xl" />}
            />
          </ButtonGroup>
        </Flex>
      </VStack>
    </VStack>
  )
}

export default FooterLinks
