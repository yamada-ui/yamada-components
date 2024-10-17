import type { FC } from "react"
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
import { useState } from "react"

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
      bg={["#f5f5f5", "#333"]}
      h={{ base: "fit-content", md: "full" }}
      placeContent="center"
      w={{ base: "full", md: "fit-content" }}
    >
      <VStack gap="0" maxW="6xl" px={{ base: "md", md: "0" }}>
        <Flex
          alignItems={{ base: "center", md: "flex-start" }}
          flexDir={{ base: "row", md: "column" }}
          gap="md"
          justifyContent="space-between"
          px={{ base: "0", md: "md" }}
          py="md"
        >
          <HStack gap="sm">
            <Image src="/favicon.svg" alt="Yamada UI" height={30} width={30} />
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
                rounded="full"
                w="6"
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
                labelProps={{
                  fontSize: "xs",
                  fontWeight: "medium",
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
                labelProps={{
                  fontSize: "xs",
                  fontWeight: "medium",
                }}
              >
                <MenuItem fontSize="sm" icon={<PauseIcon />}>
                  Pause subscription
                </MenuItem>
                <MenuItem
                  color="danger"
                  fontSize="sm"
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
          index={active}
          justifyContent={{ base: "center", md: "flex-end" }}
          onChange={setActive}
        >
          <TabList flexDir={{ base: "row", md: "column" }}>
            {tabs.map((tab, index) => (
              <Tab
                key={tab}
                as="a"
                href={`/${tab.toLocaleLowerCase()}`}
                data-active={active === index || undefined}
                bg={active === index ? ["white", "black"] : "inherit"}
                borderBottomLeftRadius={{ base: "none", md: "md" }}
                borderTopLeftRadius="md"
                borderTopRightRadius={{ base: "md", md: "none" }}
                color={active === index ? ["black", "white"] : "inherit"}
                fontSize="sm"
                fontWeight="medium"
                value={tab}
                _hover={{
                  opacity: 0.7,
                }}
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
