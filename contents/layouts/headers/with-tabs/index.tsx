import {
  ArrowLeftRightIcon,
  ChevronDownIcon,
  HeartIcon,
  LogOutIcon,
  MessageSquareIcon,
  PauseIcon,
  SettingsIcon,
  StarIcon,
  TrashIcon,
} from "@yamada-ui/lucide"
import {
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@yamada-ui/react"
import { useState, type FC } from "react"

const tabs = [
  "Home",
  "Orders",
  "Education",
  "Community",
  "Forums",
  "Support",
  "Account",
  "Helpdesk",
]

const WithTabs: FC = () => {
  const [active, setActive] = useState<number>(0)

  return (
    <Flex
      as="header"
      bg={["blackAlpha.100", "blackAlpha.500"]}
      placeContent="center"
      w={{ base: "full", md: "fit-content" }}
      h={{ base: "fit-content", md: "full" }}
    >
      <VStack maxW="6xl" gap="0" px={{ base: "md", md: "0" }}>
        <Flex
          flexDir={{ base: "row", md: "column" }}
          py="md"
          px={{ base: "0", md: "md" }}
          justifyContent="space-between"
          gap="md"
          alignItems={{ base: "center", md: "flex-start" }}
        >
          <HStack gap="sm">
            <Image src="/favicon.svg" width={30} height={30} alt="Yamada UI" />
            <Heading as="h2" fontSize="lg">
              Yamada UI
            </Heading>
          </HStack>
          <Menu>
            <MenuButton
              as={Button}
              variant="ghost"
              rightIcon={<ChevronDownIcon />}
            >
              <Image
                src="https://avatars.githubusercontent.com/u/61367823?s=80&v=4"
                alt="taroj1205"
                h="6"
                w="6"
                rounded="full"
              />
              <Text
                color={["black", "white"]}
                fontSize="md"
                fontWeight="medium"
              >
                taroj1205
              </Text>
            </MenuButton>

            <MenuList>
              <MenuItem fontSize="sm" icon={<HeartIcon color="pink.500" />}>
                Liked posts
              </MenuItem>
              <MenuItem fontSize="sm" icon={<StarIcon color="yellow.500" />}>
                Saved posts
              </MenuItem>
              <MenuItem
                fontSize="sm"
                icon={<MessageSquareIcon color="blue.500" />}
              >
                Your comments
              </MenuItem>
              <MenuGroup
                label="Settings"
                __css={{
                  ".ui-menu__item--group-label": {
                    fontSize: "xs",
                    fontWeight: "medium",
                  },
                }}
              >
                <MenuItem fontSize="sm" icon={<SettingsIcon />}>
                  Account settings
                </MenuItem>
                <MenuItem fontSize="sm" icon={<ArrowLeftRightIcon />}>
                  Change account
                </MenuItem>
                <MenuItem fontSize="sm" icon={<LogOutIcon />}>
                  Logout
                </MenuItem>
              </MenuGroup>

              <MenuDivider />

              <MenuGroup
                label="Danger zone"
                __css={{
                  ".ui-menu__item--group-label": {
                    fontSize: "xs",
                    fontWeight: "medium",
                  },
                }}
              >
                <MenuItem fontSize="sm" icon={<PauseIcon />}>
                  Pause subscription
                </MenuItem>
                <MenuItem
                  fontSize="sm"
                  color="danger"
                  icon={<TrashIcon color="danger" />}
                >
                  Delete account
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        </Flex>
        <Tabs
          variant="unstyled"
          onChange={setActive}
          index={active}
          orientation="vertical"
          justifyContent={{ base: "center", md: "flex-end" }}
        >
          <TabList flexDir={{ base: "row", md: "column" }}>
            {tabs.map((tab, index) => (
              <Tab
                key={tab}
                value={tab}
                data-active={active === index || undefined}
                bg={active === index ? ["white", "black"] : undefined}
                borderTopLeftRadius="md"
                borderTopRightRadius={{ base: "md", md: "none" }}
                borderBottomLeftRadius={{ base: "none", md: "md" }}
                fontWeight="medium"
                fontSize="sm"
                as="a"
                href={`/${tab.toLocaleLowerCase()}`}
                onClick={(e: { preventDefault: () => any }) =>
                  e.preventDefault()
                }
              >
                {tab}
              </Tab>
            ))}
          </TabList>
          <TabPanels display="none" />
        </Tabs>
      </VStack>
    </Flex>
  )
}

export default WithTabs
