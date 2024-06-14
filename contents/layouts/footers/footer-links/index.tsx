import { Instagram, Twitter, Youtube } from "@yamada-ui/lucide"
import {
  Text,
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
    <VStack borderTopWidth="1px" py="xl" px="md">
      <Flex
        justifyContent="space-between"
        alignItems="flex-start"
        _container={[
          {
            maxW: "768px",
            css: {
              flexDirection: "column",
              gap: "sm",
              alignItems: "center",
            },
          },
        ]}
        py="md"
      >
        <VStack maxW="xs">
          <HStack
            gap="sm"
            _container={[
              {
                maxW: "768px",
                css: {
                  mx: "auto",
                },
              },
            ]}
          >
            <Image src="/favicon.svg" width={30} height={30} alt="Yamada UI" />
            <Text fontSize="lg">Yamada UI</Text>
          </HStack>
          <Text
            fontSize="sm"
            color="GrayText"
            textAlign="left"
            _container={[
              {
                maxW: "768px",
                css: {
                  textAlign: "center",
                },
              },
            ]}
          >
            Unleash the Power of Styling, Animation, and Flexibility in React
            Apps
          </Text>
        </VStack>
        <SimpleGrid
          columns={3}
          px="md"
          _container={[
            {
              maxW: "768px",
              css: {
                display: "none",
              },
            },
          ]}
        >
          {groups}
        </SimpleGrid>
      </Flex>
      <Divider />
      <Flex
        flexDir="row"
        alignItems="flex-start"
        _container={[
          {
            maxW: "768px",
            css: {
              flexDir: "column",
              alignItems: "center",
            },
          },
        ]}
        py="md"
      >
        <Text color="GrayText" fontSize="sm">
          © 2024 Yamada UI. All rights reserved.
        </Text>
        <Spacer />
        <Flex gap="xs">
          <IconButton variant="ghost" borderRadius="full" icon={<Twitter />} />
          <IconButton variant="ghost" borderRadius="full" icon={<Youtube />} />
          <IconButton
            variant="ghost"
            borderRadius="full"
            icon={<Instagram />}
          />
        </Flex>
      </Flex>
    </VStack>
  )
}

export default FooterLinks
