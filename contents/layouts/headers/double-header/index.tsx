import type { FC } from "react"
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Link,
  Tab,
  TabList,
  Tabs,
  useDisclosure,
  VStack,
} from "@yamada-ui/react"
import { useState } from "react"

const userLinks = [
  { label: "Privacy & Security", link: "#" },
  { label: "Account settings", link: "#" },
  { label: "Support options", link: "#" },
]

const mainLinks = [
  { label: "Book a demo", link: "#" },
  { label: "Documentation", link: "#" },
  { label: "Community", link: "#" },
  { label: "Academy", link: "#" },
  { label: "Forums", link: "#" },
]

const DoubleHeader: FC = () => {
  const [index, onChange] = useState<number>(0)
  const { isOpen, onToggle } = useDisclosure()

  const mainItems = mainLinks.map((item, i) => {
    const active = i === index
    return (
      <Tab
        key={item.label}
        as={Link}
        href={item.link}
        data-active={active || undefined}
        borderBottomColor={active ? "primary" : undefined}
        borderBottomWidth="1"
        color={
          active ? ["black", "white"] : ["blackAlpha.700", "whiteAlpha.700"]
        }
        fontSize="xs"
        fontWeight={700}
        marginBottom="-1px"
        px="sm"
        value={item.label}
        _hover={{
          color: !active ? ["black", "white"] : undefined,
          textDecor: "none",
        }}
        onClick={(event: { preventDefault: () => any }) =>
          event.preventDefault()
        }
      >
        {item.label}
      </Tab>
    )
  })

  const secondaryItems = userLinks.map((item) => (
    <Link
      key={item.label}
      href={item.link}
      color={["blackAlpha.700", "whiteAlpha.700"]}
      fontSize="xs"
      _hover={{ color: ["black", "white"], textDecor: "none" }}
      onClick={(event) => event.preventDefault()}
    >
      {item.label}
    </Link>
  ))

  return (
    <Box
      as="header"
      borderBottomWidth="1px"
      justifyContent="space-between"
      pt="sm"
      px="md"
    >
      <HStack maxW="6xl" mx="auto" pb={{ md: "sm" }}>
        <Box flex={1}>
          <Heading
            as="a"
            size="md"
            whiteSpace="nowrap"
            onClick={(e) => e.preventDefault()}
          >
            Yamada UI
          </Heading>
        </Box>

        <VStack display={{ base: "flex", md: "none" }} flex={1} gap="sm">
          <HStack gap="md" justify="flex-end" pr="sm" pt="md">
            {secondaryItems}
          </HStack>

          <Tabs as="nav" variant="unstyled" gap="0" onChange={onChange}>
            <TabList border="none" justifyContent="flex-end">
              {mainItems}
            </TabList>
          </Tabs>
        </VStack>

        <IconButton
          type="button"
          variant="unstyled"
          display={{ base: "none", md: "flex" }}
          icon={
            <>
              <Box
                bg={["black", "white"]}
                height="1px"
                position="absolute"
                transform={isOpen ? "rotate(45deg)" : "translateY(-8px)"}
                transitionDuration="300ms"
                transitionProperty="all"
                width="24px"
              />

              <Box
                bg={["black", "white"]}
                height="1px"
                opacity={isOpen ? 0 : 1}
                position="absolute"
                transform={isOpen ? "translateX(20px)" : undefined}
                transitionDuration="400ms"
                transitionProperty="all"
                width="24px"
              />

              <Box
                bg={["black", "white"]}
                height="1px"
                position="absolute"
                transform={isOpen ? "rotate(-45deg)" : "translateY(8px)"}
                transitionDuration="300ms"
                transitionProperty="all"
                width="24px"
              />
            </>
          }
          p="1"
          placeContent="center"
          placeItems="center"
          title="Menu"
          onClick={onToggle}
        />
      </HStack>
    </Box>
  )
}

export default DoubleHeader
