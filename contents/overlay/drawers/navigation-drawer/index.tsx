import {
  Button,
  ButtonGroup,
  Divider,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Heading,
  Text,
  useDisclosure,
} from "@yamada-ui/react"
import type { FC } from "react"
import { tabData } from "./data"

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
        display="grid"
        size="sm"
        blockScrollOnMount={false}
        overflowY="auto"
        sx={{
          ".ui-drawer__inner": {
            gap: "md",
          },
        }}
      >
        <DrawerHeader m="0">
          <Heading as="h2" size="lg">
            Yamada Components
          </Heading>
        </DrawerHeader>
        <Divider />
        <DrawerBody m="0">
          <ButtonGroup direction="column" w="full" gap="sm">
            {tabData.top.map((item) => (
              <Button
                as="a"
                href={item.link}
                key={item.label}
                onClick={(e) => e.preventDefault()}
                colorScheme="primary"
                variant="ghost"
                color={["black", "white"]}
                w="full"
                justifyContent="flex-start"
              >
                <item.icon fontSize="xl" />
                <Text fontSize="xl">{item.label}</Text>
              </Button>
            ))}
          </ButtonGroup>
        </DrawerBody>
        <Divider />
        <DrawerFooter m="0">
          <ButtonGroup direction="column" w="full" gap="sm">
            {tabData.bottom.map((item) => (
              <Button
                as="a"
                href={item.link}
                key={item.label}
                onClick={(event) => event.preventDefault()}
                colorScheme={item.color ?? "primary"}
                w="full"
                variant="ghost"
                justifyContent="flex-start"
              >
                <item.icon
                  fontSize="xl"
                  color={item.color ?? ["black", "white"]}
                />
                <Text fontSize="xl" color={item.color ?? ["black", "white"]}>
                  {item.label}
                </Text>
              </Button>
            ))}
          </ButtonGroup>
        </DrawerFooter>
      </Drawer>
    </>
  )
}

export default NavigationDrawer
