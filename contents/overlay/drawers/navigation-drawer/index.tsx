import {
  House,
  Search,
  Bell,
  Heart,
  Diamond,
  User,
  Settings,
  LogOut,
} from "@yamada-ui/lucide"
import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Heading,
  Text,
  useDisclosure,
  VStack,
} from "@yamada-ui/react"
import type { FC } from "react"
import React from "react"

const NavigationDrawer: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  type TabData = {
    top: { link: string; label: string; icon: React.ElementType }[]
    bottom: { link: string; label: string; icon: React.ElementType }[]
  }

  const tabData: TabData = {
    top: [
      { link: "", label: "Home", icon: House },
      { link: "", label: "Search", icon: Search },
      { link: "", label: "Notifications", icon: Bell },
      { link: "", label: "Favorites", icon: Heart },
      { link: "", label: "Premium Plan", icon: Diamond },
    ],
    bottom: [
      { link: "", label: "Profile", icon: User },
      { link: "", label: "Setting", icon: Settings },
      { link: "", label: "Logout", icon: LogOut },
    ],
  }
  return (
    <>
      <Button onClick={onOpen}>Open Drawer</Button>

      <Drawer
        as="nav"
        isOpen={isOpen}
        onClose={onClose}
        placement="left"
        size="sm"
        display="grid"
        blockScrollOnMount={false}
        overflow="auto"
      >
        <DrawerHeader pb="lg">
          <Heading size="lg" color="primary">
            Yamada Component
          </Heading>
        </DrawerHeader>
        <Divider variant="solid" />
        <DrawerBody overflow="auto">
          <VStack flex={1}>
            {tabData.top.map((item) => (
              <Button
                as="a"
                href={item.link}
                key={item.label}
                onClick={(event) => event.preventDefault()}
                colorScheme="primary"
                variant="ghost"
                w="full"
                justifyContent="left"
              >
                {React.createElement(item.icon, { size: "xl" })}
                <Text fontSize="xl">{item.label}</Text>
              </Button>
            ))}
          </VStack>
          <Divider variant="solid" />
          <VStack>
            {tabData.bottom.map((item) => (
              <Button
                as="a"
                href={item.link}
                key={item.label}
                onClick={(event) => event.preventDefault()}
                colorScheme="primary"
                variant="ghost"
                w="full"
                justifyContent="left"
              >
                {React.createElement(item.icon, { size: "xl" })}
                <Text fontSize="xl">{item.label}</Text>
              </Button>
            ))}
          </VStack>
        </DrawerBody>
        <DrawerFooter></DrawerFooter>
      </Drawer>
    </>
  )
}

export default NavigationDrawer
