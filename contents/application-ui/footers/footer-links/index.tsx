import {
  Text,
  Box,
  Flex,
  IconButton,
  Image,
  Link,
  VStack,
  HStack,
  Spacer,
  Divider,
  SimpleGrid,
} from "@yamada-ui/react"
import { Instagram, Twitter, Youtube } from "lucide-react"
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
      <Link
        key={index}
        href={link.link}
        onClick={(event) => event.preventDefault()}
        fontSize="sm"
      >
        {link.label}
      </Link>
    ))

    return (
      <VStack gap="xs" key={group.title}>
        <Text fontSize="lg" fontWeight="semibold">
          {group.title}
        </Text>
        {links}
      </VStack>
    )
  })

  return (
    <Box bg={["white", "black"]}>
      <Divider mt="3xl" />
      <Box bg="blackAlpha.50">
        <VStack py="xl" px="md" maxW="6xl" mx="auto">
          <Flex
            justifyContent="space-between"
            alignItems={{ base: "flex-start", md: "center" }}
            flexDir={{ base: "row", md: "column" }}
            gap={{ base: "initial", md: "sm" }}
            py="md"
          >
            <VStack maxW="xs">
              <HStack gap="sm" mx={{ base: "inherit", md: "auto" }}>
                <Image
                  src="/favicon.svg"
                  width={30}
                  height={30}
                  alt="Yamada UI"
                />
                <Text fontSize="lg">Yamada UI</Text>
              </HStack>
              <Text
                fontSize="sm"
                color="GrayText"
                textAlign={{ base: "left", md: "center" }}
              >
                Unleash the Power of Styling, Animation, and Flexibility in
                React Apps
              </Text>
            </VStack>
            <SimpleGrid
              columns={3}
              px="md"
              display={{ base: "grid", md: "none" }}
            >
              {groups}
            </SimpleGrid>
          </Flex>
          <Divider />
          <Flex
            flexDir={{ base: "row", md: "column" }}
            alignItems={{ base: "flex-start", md: "center" }}
            py="md"
          >
            <Text color="GrayText" fontSize="sm">
              © 2024 Yamada UI. All rights reserved.
            </Text>
            <Spacer />
            <Flex gap="xs">
              <IconButton
                variant="ghost"
                borderRadius="full"
                icon={<Twitter />}
              />
              <IconButton
                variant="ghost"
                borderRadius="full"
                icon={<Youtube />}
              />
              <IconButton
                variant="ghost"
                borderRadius="full"
                icon={<Instagram />}
              />
            </Flex>
          </Flex>
        </VStack>
      </Box>
    </Box>
  )
}

export default FooterLinks
