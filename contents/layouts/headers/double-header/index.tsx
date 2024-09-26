import {
  Box,
  HStack,
  Heading,
  IconButton,
  Link,
  Tab,
  TabList,
  Tabs,
  VStack,
  useDisclosure,
} from "@yamada-ui/react"
import type { FC } from "react"
import { useState } from "react"

const userLinks = [
  { link: "#", label: "Privacy & Security" },
  { link: "#", label: "Account settings" },
  { link: "#", label: "Support options" },
]

const mainLinks = [
  { link: "#", label: "Book a demo" },
  { link: "#", label: "Documentation" },
  { link: "#", label: "Community" },
  { link: "#", label: "Academy" },
  { link: "#", label: "Forums" },
]

const DoubleHeader: FC = () => {
  const [index, onChange] = useState<number>(0)
  const { isOpen, onToggle } = useDisclosure()

  const mainItems = mainLinks.map((item, i) => {
    const active = i === index
    return (
      <Tab
        as={Link}
        href={item.link}
        key={item.label}
        value={item.label}
        color={
          active ? ["black", "white"] : ["blackAlpha.700", "whiteAlpha.700"]
        }
        onClick={(event: { preventDefault: () => any }) =>
          event.preventDefault()
        }
        fontSize="xs"
        data-active={active || undefined}
        fontWeight={700}
        px="sm"
        borderBottomWidth="1"
        marginBottom="-1px"
        borderBottomColor={active ? "primary" : undefined}
        _hover={{
          textDecor: "none",
          color: !active ? ["black", "white"] : undefined,
        }}
      >
        {item.label}
      </Tab>
    )
  })

  const secondaryItems = userLinks.map((item) => (
    <Link
      href={item.link}
      key={item.label}
      onClick={(event) => event.preventDefault()}
      color={["blackAlpha.700", "whiteAlpha.700"]}
      _hover={{ textDecor: "none", color: ["black", "white"] }}
      fontSize="xs"
    >
      {item.label}
    </Link>
  ))

  return (
    <Box
      as="header"
      justifyContent="space-between"
      borderBottomWidth="1px"
      pt="sm"
      px="md"
    >
      <HStack maxW="6xl" mx="auto" pb={{ md: "sm" }}>
        <Box flex={1}>
          <Heading
            size="md"
            as="a"
            whiteSpace="nowrap"
            onClick={(e) => e.preventDefault()}
          >
            Yamada UI
          </Heading>
        </Box>

        <VStack flex={1} gap="sm" display={{ base: "flex", md: "none" }}>
          <HStack pt="md" pr="sm" gap="md" justify="flex-end">
            {secondaryItems}
          </HStack>

          <Tabs gap="0" as="nav" onChange={onChange} variant="unstyled">
            <TabList justifyContent="flex-end" border="none">
              {mainItems}
            </TabList>
          </Tabs>
        </VStack>

        <IconButton
          title="Menu"
          type="button"
          variant="unstyled"
          display={{ base: "none", md: "flex" }}
          placeContent="center"
          placeItems="center"
          p="1"
          onClick={onToggle}
          icon={
            <>
              <Box
                position="absolute"
                width="24px"
                height="1px"
                transform={isOpen ? "rotate(45deg)" : "translateY(-8px)"}
                bg={["black", "white"]}
                transitionDuration="300ms"
                transitionProperty="all"
              />

              <Box
                position="absolute"
                width="24px"
                height="1px"
                transform={isOpen ? "translateX(20px)" : undefined}
                opacity={isOpen ? 0 : 1}
                bg={["black", "white"]}
                transitionDuration="400ms"
                transitionProperty="all"
              />

              <Box
                position="absolute"
                width="24px"
                height="1px"
                transform={isOpen ? "rotate(-45deg)" : "translateY(8px)"}
                bg={["black", "white"]}
                transitionDuration="300ms"
                transitionProperty="all"
              />
            </>
          }
        />
      </HStack>
    </Box>
  )
}

export default DoubleHeader
