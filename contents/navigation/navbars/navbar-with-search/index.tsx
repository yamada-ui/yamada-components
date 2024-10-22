import type { FC } from "react"
import {
  ChevronRightIcon,
  LightbulbIcon,
  PlusIcon,
  SearchIcon,
  SquareCheckBigIcon,
  UserIcon,
} from "@yamada-ui/lucide"
import {
  Avatar,
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  IconButton,
  Indicator,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Kbd,
  LinkBox,
  LinkOverlay,
  Spacer,
  Text,
  VStack,
} from "@yamada-ui/react"

const NavbarWithSearch: FC = () => {
  const tabs = {
    collections: [
      { emoji: "👍", label: "Sales" },
      { emoji: "🚚", label: "Deliveries" },
      { emoji: "💸", label: "Discounts" },
      { emoji: "💰", label: "Profits" },
      { emoji: "✨", label: "Reports" },
      { emoji: "🛒", label: "Orders" },
      { emoji: "📅", label: "Events" },
      { emoji: "🙈", label: "Debts" },
      { emoji: "💁‍♀️", label: "Customers" },
    ],
    general: [
      { icon: LightbulbIcon, label: "Activity", notifications: "3" },
      { icon: SquareCheckBigIcon, label: "Tasks", notifications: "4" },
      { icon: UserIcon, label: "Contacts", notifications: "" },
    ],
  }

  return (
    <VStack
      as="nav"
      borderRight="1px solid"
      borderRightColor="border"
      fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
      h="full"
      minH="700px"
      w="300px"
    >
      <LinkBox
        as="article"
        cursor="pointer"
        maxW="sm"
        transition="all 0.1s"
        _hover={{
          background: ["#F5F5F5", "gray.800"],
          textDecor: "none",
        }}
      >
        <LinkOverlay href="#" onClick={(event) => event.preventDefault()}>
          <Flex align="center" gap="md" p="md">
            <Avatar
              name="Hirotomo Yamada"
              src="https://avatars.githubusercontent.com/u/84060430?v=4"
            />
            <Flex align="center" gap="lg">
              <Box>
                <Text as="b" fontSize="sm">
                  Hirotomo Yamada
                </Text>
                <Text color="gray.400" fontSize="xs">
                  hirotomo.yamada@avap.co.jp
                </Text>
              </Box>
              <ChevronRightIcon />
            </Flex>
          </Flex>
        </LinkOverlay>
        <Divider variant="solid" />
      </LinkBox>

      <VStack as="nav" px="md">
        <InputGroup size="sm">
          <InputLeftElement>
            <SearchIcon color="gray.500" />
          </InputLeftElement>
          <Input
            color={["#505050", "gray.200"]}
            fontSize="xs"
            placeholder="Search"
            pr="4.6rem"
          />
          <InputRightElement w="4.6rem">
            <Text color={["black", "white"]}>
              <Kbd>Ctrl + K</Kbd>
            </Text>
          </InputRightElement>
        </InputGroup>
      </VStack>

      <Flex direction="column" px="1">
        {tabs.general.map((tab) => (
          <Box key={tab.label}>
            <LinkBox
              as="article"
              cursor="pointer"
              maxW="sm"
              transition="all 0.1s"
              _hover={{
                background: ["#F5F5F5", "gray.800"],
                textDecor: "none",
              }}
            >
              <LinkOverlay href="#" onClick={(event) => event.preventDefault()}>
                <Indicator
                  isDisabled={!tab.notifications}
                  label={tab.notifications}
                  ping
                  pingScale={1.4}
                  placement="right"
                  right="6"
                >
                  <Center gap="md" justifyContent="start" px="4" py="2">
                    <tab.icon color="#909090" />
                    <Text color={["#505050", "gray.200"]} fontSize="xs">
                      {tab.label}
                    </Text>
                  </Center>
                </Indicator>
              </LinkOverlay>
            </LinkBox>
          </Box>
        ))}
      </Flex>
      <Divider variant="solid" />

      <VStack as="nav" px="md">
        <HStack>
          <Text as="sub" color={["#808080", "gray.400"]}>
            Collections
          </Text>
          <Spacer />
          <IconButton
            size="xs"
            variant="outline"
            borderColor={["gray.100", "gray.800"]}
            color={["gray.800", "white"]}
            icon={<PlusIcon />}
          />
        </HStack>
      </VStack>

      <Flex direction="column" px="1">
        {tabs.collections.map((tab) => (
          <Box key={tab.label}>
            <LinkBox
              as="article"
              cursor="pointer"
              maxW="sm"
              transition="all 0.1s"
              _hover={{
                background: ["#F5F5F5", "gray.800"],
                textDecor: "none",
              }}
            >
              <LinkOverlay href="#" onClick={(event) => event.preventDefault()}>
                <Flex align="center" gap="md" px="3.5" py="1.5">
                  <Text fontSize="sm">{tab.emoji}</Text>
                  <Text color={["black", "gray.200"]} fontSize="xs">
                    {tab.label}
                  </Text>
                </Flex>
              </LinkOverlay>
            </LinkBox>
          </Box>
        ))}
      </Flex>
    </VStack>
  )
}

export default NavbarWithSearch
