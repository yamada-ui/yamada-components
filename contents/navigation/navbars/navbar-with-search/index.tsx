import type { FC } from "react"
import {
  ActivityIcon,
  ChevronRightIcon,
  InfoIcon,
  Plus,
  Search,
  UserIcon,
} from "@yamada-ui/lucide"
import {
  Avatar,
  Box,
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
      { icon: "👍", label: "Sales" },
      { icon: "🚚", label: "Deliveries" },
      { icon: "💸", label: "Discounts" },
      { icon: "💰", label: "Profits" },
      { icon: "✨", label: "Reports" },
      { icon: "🛒", label: "Orders" },
      { icon: "📅", label: "Events" },
      { icon: "🙈", label: "Debts" },
      { icon: "💁‍♀️", label: "Customers" },
    ],
    general: [
      { icon: ActivityIcon, label: "Activity", number: "3" },
      { icon: InfoIcon, label: "Tasks", number: "4" },
      { icon: UserIcon, label: "Contacts", number: "" },
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
        _hover={{ bg: "#F5F5F5" }}
      >
        <LinkOverlay>
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
            <Search color="gray.500" />
          </InputLeftElement>
          <Input placeholder="Search" pr="4.6rem" />
          <InputRightElement w="4.6rem">
            <Text color="#080808">
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
              _hover={{ bg: "#F5F5F5" }}
            >
              <LinkOverlay>
                <Flex align="center" gap="md" px="4" py="2">
                  <tab.icon color="#909090" />
                  <Text color="#505050" fontSize="sm">
                    {tab.label}
                  </Text>
                  <Spacer />
                  {tab.number ? (
                    <Indicator
                      label={tab.number}
                      offset={1.5}
                      ping
                      pingScale={1.4}
                      placement="right"
                    >
                      <Avatar display="none" />
                    </Indicator>
                  ) : null}
                </Flex>
              </LinkOverlay>
            </LinkBox>
          </Box>
        ))}
      </Flex>
      <Divider variant="solid" />

      <VStack as="nav" px="md">
        <HStack>
          <Text as="sub" color="#808080">
            Collections
          </Text>
          <Spacer />
          <IconButton
            size="xs"
            variant="outline"
            borderColor="gray.100"
            icon={<Plus />}
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
              _hover={{ bg: "#F5F5F5" }}
            >
              <LinkOverlay>
                <Flex align="center" gap="sm" px="3.5" py="1.5">
                  <Text>{tab.icon}</Text>
                  <Text color="#505050" fontSize="sm">
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
