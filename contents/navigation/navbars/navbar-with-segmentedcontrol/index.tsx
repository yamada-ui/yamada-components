import {
  ArrowRightLeft,
  BellRing,
  Database,
  FileText,
  Files,
  Fingerprint,
  Key,
  LogOut,
  MessageSquareText,
  MessagesSquare,
  Receipt,
  Settings,
  ShoppingCart,
  Users,
} from "@yamada-ui/lucide"
import {
  Badge,
  Box,
  Button,
  HStack,
  Heading,
  Link,
  SegmentedControl,
  SegmentedControlButton,
  Text,
  VStack,
  toCamelCase,
} from "@yamada-ui/react"
import { useState, type FC } from "react"

const tabs = {
  account: [
    { link: "", label: "Notifications", icon: BellRing },
    { link: "", label: "Billing", icon: Receipt },
    { link: "", label: "Security", icon: Fingerprint },
    { link: "", label: "SSH Keys", icon: Key },
    { link: "", label: "Databases", icon: Database },
    { link: "", label: "Authentication", icon: Users },
    { link: "", label: "Other Settings", icon: Settings },
  ],
  general: [
    { link: "", label: "Orders", icon: ShoppingCart },
    { link: "", label: "Receipts", icon: FileText },
    { link: "", label: "Reviews", icon: MessageSquareText },
    { link: "", label: "Messages", icon: MessagesSquare },
    { link: "", label: "Customers", icon: Users },
    { link: "", label: "Refunds", icon: Receipt },
    { link: "", label: "Files", icon: Files },
  ],
}

type TabsKey = keyof typeof tabs

const NavbarWithSegmentedcontrol: FC = () => {
  const [section, setSection] = useState<TabsKey>("account")
  const [active, setActive] = useState<string>(tabs[section][0]["label"])

  return (
    <VStack
      as="nav"
      w="300px"
      minH="700px"
      h="full"
      p="md"
      borderRight="1px solid"
      borderRightColor={["blackAlpha.500", "whiteAlpha.500"]}
    >
      <Box flex={1}>
        <HStack justifyContent="space-between" pb="md" mb="md" as="header">
          <Heading
            as="a"
            size="lg"
            whiteSpace="nowrap"
            color={["black", "white"]}
            onClick={(e) => e.preventDefault()}
          >
            Yamada UI
          </Heading>
          <Badge fontWeight={700}>v2.0.0</Badge>
        </HStack>
        <SegmentedControl
          display="flex"
          size="sm"
          mb="xl"
          value={section}
          onChange={(value) => setSection(value as TabsKey)}
          transitionTimingFunction="ease"
        >
          {(Object.keys(tabs) as TabsKey[]).map((tab, i) => (
            <SegmentedControlButton
              key={i}
              value={tab}
              data-active={section === tab || undefined}
            >
              {toCamelCase(tab)}
            </SegmentedControlButton>
          ))}
        </SegmentedControl>
        {tabs[section].map((item) => (
          <Button
            as={Link}
            data-active={item.label === active || undefined}
            href={item.link}
            key={item.label}
            variant="ghost"
            display="flex"
            justifyContent="left"
            alignItems="center"
            {...(item.label === active
              ? {
                  color: ["white", "black"],
                  backgroundColor: "primary",
                }
              : {})}
            _hover={{
              textDecor: "none",
            }}
            onClick={(event) => {
              event.preventDefault()
              setActive(item.label)
            }}
          >
            <item.icon />
            <Text>{item.label}</Text>
          </Button>
        ))}
      </Box>

      <Box as="footer" pt="md" mt="md">
        <Button
          as={Link}
          href="#"
          onClick={(event) => event.preventDefault()}
          variant="ghost"
          color={["black", "white"]}
          display="flex"
          justifyContent="left"
          alignItems="center"
          _hover={{
            textDecor: "none",
          }}
        >
          <ArrowRightLeft />
          <Text>Change account</Text>
        </Button>

        <Button
          as={Link}
          onClick={(event) => event.preventDefault()}
          variant="ghost"
          color={["black", "white"]}
          display="flex"
          justifyContent="left"
          alignItems="center"
          _hover={{
            textDecor: "none",
          }}
        >
          <LogOut />
          <Text>Logout</Text>
        </Button>
      </Box>
    </VStack>
  )
}

export default NavbarWithSegmentedcontrol
