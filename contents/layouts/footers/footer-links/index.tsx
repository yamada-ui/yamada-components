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
  List,
  ListItem,
  SimpleGrid,
  Text,
  VStack,
} from "@yamada-ui/react"

const data = [
  {
    links: [
      { label: "Features", link: "#" },
      { label: "Pricing", link: "#" },
      { label: "Support", link: "#" },
      { label: "Forums", link: "#" },
    ],
    title: "About",
  },
  {
    links: [
      { label: "Contribute", link: "#" },
      { label: "Media assets", link: "#" },
      { label: "Changelog", link: "#" },
      { label: "Releases", link: "#" },
    ],
    title: "Project",
  },
  {
    links: [
      { label: "Join Discord", link: "#" },
      { label: "Follow on Twitter", link: "#" },
      { label: "Email newsletter", link: "#" },
      { label: "GitHub discussions", link: "#" },
    ],
    title: "Community",
  },
]

const FooterLinks: FC = () => {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <ListItem key={index}>
        <Link
          href={link.link}
          color="muted"
          fontSize="sm"
          onClick={(event) => event.preventDefault()}
        >
          {link.label}
        </Link>
      </ListItem>
    ))

    return (
      <List key={group.title} gap="md">
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
      as="footer"
      alignItems="center"
      bg={["white", "whiteAlpha.100"]}
      gap="0"
    >
      <Divider borderColor={["blackAlpha.300", "border"]} />
      <VStack gap="0" maxW="6xl" placeItems="center" px="md" py="xl">
        <Flex
          alignItems="center"
          flexDir={{ md: "column" }}
          justifyContent={{ base: "space-between", md: "center" }}
          px="md"
          py="lg"
          w="full"
        >
          <VStack maxW="xs">
            <HStack gap="sm" justifyContent={{ base: "start", md: "center" }}>
              <Image
                src="/favicon.svg"
                alt="Yamada UI"
                height={30}
                width={30}
              />
              <Text fontSize="lg">Yamada UI</Text>
            </HStack>
            <Text color="muted" fontSize="sm" textAlign={{ md: "center" }}>
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
          gap={{ md: "md" }}
          justifyContent="space-between"
          placeItems="center"
          px="md"
          py="lg"
          w="full"
        >
          <Text color="muted" fontSize="sm">
            © 2024 Yamada UI. All rights reserved.
          </Text>
          <ButtonGroup gap="xs">
            <IconButton
              variant="ghost"
              borderRadius="full"
              icon={<TwitterIcon fontSize="2xl" />}
            />
            <IconButton
              variant="ghost"
              borderRadius="full"
              icon={<YoutubeIcon fontSize="2xl" />}
            />
            <IconButton
              variant="ghost"
              borderRadius="full"
              icon={<InstagramIcon fontSize="2xl" />}
            />
          </ButtonGroup>
        </Flex>
      </VStack>
    </VStack>
  )
}

export default FooterLinks
