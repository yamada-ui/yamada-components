import {
  ArrowRightLeftIcon,
  BellRingIcon,
  DatabaseIcon,
  FileTextIcon,
  FilesIcon,
  FingerprintIcon,
  KeyIcon,
  LogOutIcon,
  MessageSquareTextIcon,
  MessagesSquareIcon,
  ReceiptIcon,
  SettingsIcon,
  ShoppingCartIcon,
  UsersIcon,
} from "@yamada-ui/lucide"
import {
  Box,
  Button,
  HStack,
  Heading,
  Link,
  SegmentedControl,
  SegmentedControlButton,
  Tag,
  Text,
  VStack,
  toCamelCase,
} from "@yamada-ui/react"
import { useState, type FC } from "react"

const tabs = {
  account: [
    { link: "", label: "Notifications", icon: BellRingIcon },
    { link: "", label: "Billing", icon: ReceiptIcon },
    { link: "", label: "Security", icon: FingerprintIcon },
    { link: "", label: "SSH Keys", icon: KeyIcon },
    { link: "", label: "Databases", icon: DatabaseIcon },
    { link: "", label: "Authentication", icon: UsersIcon },
    { link: "", label: "Other Settings", icon: SettingsIcon },
  ],
  general: [
    { link: "", label: "Orders", icon: ShoppingCartIcon },
    { link: "", label: "Receipts", icon: FileTextIcon },
    { link: "", label: "Reviews", icon: MessageSquareTextIcon },
    { link: "", label: "Messages", icon: MessagesSquareIcon },
    { link: "", label: "Customers", icon: UsersIcon },
    { link: "", label: "Refunds", icon: ReceiptIcon },
    { link: "", label: "Files", icon: FilesIcon },
  ],
}

type TabsKey = keyof typeof tabs

const NavbarWithSegmentedControl: FC = () => {
  const [section, setSection] = useState<TabsKey>("account")
  const [active, setActive] = useState<string>(tabs[section][0].label)

  return (
    <VStack
      as="nav"
      w="300px"
      minH="700px"
      h="full"
      p="md"
      borderRight="1px solid"
      borderRightColor="border"
    >
      <Box flex={1}>
        <HStack justifyContent="space-between" pb="md" mb="md" as="header">
          <Heading
            as="a"
            size="md"
            whiteSpace="nowrap"
            color={["black", "white"]}
            onClick={(e) => e.preventDefault()}
          >
            Yamada UI
          </Heading>
          <Tag fontWeight={500} fontSize="xs">
            v2.0.0
          </Tag>
        </HStack>
        <SegmentedControl
          display="flex"
          size="sm"
          mb="xl"
          value={section}
          onChange={(value) => setSection(value as TabsKey)}
          transitionTimingFunction="ease"
        >
          {(Object.keys(tabs) as TabsKey[]).map((tab) => (
            <SegmentedControlButton
              key={tab}
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
          <ArrowRightLeftIcon />
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
          <LogOutIcon />
          <Text>Logout</Text>
        </Button>
      </Box>
    </VStack>
  )
}

export default NavbarWithSegmentedControl
