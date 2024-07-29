import {
  HouseIcon,
  SearchIcon,
  BellIcon,
  HeartIcon,
  DiamondIcon,
  UserIcon,
  SettingsIcon,
  LogOutIcon,
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

const tabData = {
  top: [
    { link: "", label: "Home", icon: HouseIcon },
    { link: "", label: "Search", icon: SearchIcon },
    { link: "", label: "Notifications", icon: BellIcon },
    { link: "", label: "Favorites", icon: HeartIcon },
    { link: "", label: "Premium Plan", icon: DiamondIcon },
  ],
  bottom: [
    { link: "", label: "Profile", icon: UserIcon },
    { link: "", label: "Settings", icon: SettingsIcon },
    { link: "", label: "Logout", icon: LogOutIcon },
  ],
}

const NavigationDrawer: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

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
            Yamada Components
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
                <item.icon fontSize="xl" />
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
                <item.icon fontSize="xl" />
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
