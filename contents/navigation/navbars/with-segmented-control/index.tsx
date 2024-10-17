import type { FC } from "react"
import {
  ArrowRightLeftIcon,
  BellRingIcon,
  DatabaseIcon,
  FilesIcon,
  FileTextIcon,
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
  Heading,
  HStack,
  Link,
  SegmentedControl,
  SegmentedControlButton,
  Tag,
  Text,
  toCamelCase,
  VStack,
} from "@yamada-ui/react"
import { useState } from "react"

const tabs = {
  account: [
    { icon: BellRingIcon, label: "Notifications", link: "" },
    { icon: ReceiptIcon, label: "Billing", link: "" },
    { icon: FingerprintIcon, label: "Security", link: "" },
    { icon: KeyIcon, label: "SSH Keys", link: "" },
    { icon: DatabaseIcon, label: "Databases", link: "" },
    { icon: UsersIcon, label: "Authentication", link: "" },
    { icon: SettingsIcon, label: "Other Settings", link: "" },
  ],
  general: [
    { icon: ShoppingCartIcon, label: "Orders", link: "" },
    { icon: FileTextIcon, label: "Receipts", link: "" },
    { icon: MessageSquareTextIcon, label: "Reviews", link: "" },
    { icon: MessagesSquareIcon, label: "Messages", link: "" },
    { icon: UsersIcon, label: "Customers", link: "" },
    { icon: ReceiptIcon, label: "Refunds", link: "" },
    { icon: FilesIcon, label: "Files", link: "" },
  ],
}

type TabsKey = keyof typeof tabs

const NavbarWithSegmentedControl: FC = () => {
  const [section, setSection] = useState<TabsKey>("account")
  const [active, setActive] = useState<string>(tabs[section][0]?.label || "")

  return (
    <VStack
      as="nav"
      borderRight="1px solid"
      borderRightColor="border"
      h="full"
      minH="700px"
      p="md"
      w="300px"
    >
      <Box flex={1}>
        <HStack as="header" justifyContent="space-between" mb="md" pb="md">
          <Heading
            as="a"
            size="md"
            color={["black", "white"]}
            whiteSpace="nowrap"
            onClick={(e) => e.preventDefault()}
          >
            Yamada UI
          </Heading>
          <Tag fontSize="xs" fontWeight={500}>
            v2.0.0
          </Tag>
        </HStack>
        <SegmentedControl
          size="sm"
          display="flex"
          mb="xl"
          transitionTimingFunction="ease"
          value={section}
          onChange={(value) => setSection(value as TabsKey)}
        >
          {(Object.keys(tabs) as TabsKey[]).map((tab) => (
            <SegmentedControlButton
              key={tab}
              data-active={section === tab || undefined}
              value={tab}
            >
              {toCamelCase(tab)}
            </SegmentedControlButton>
          ))}
        </SegmentedControl>
        {tabs[section].map((item) => (
          <Button
            key={item.label}
            as={Link}
            href={item.link}
            variant="ghost"
            data-active={item.label === active || undefined}
            alignItems="center"
            display="flex"
            justifyContent="left"
            {...(item.label === active
              ? {
                  backgroundColor: "primary",
                  color: ["white", "black"],
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

      <Box as="footer" mt="md" pt="md">
        <Button
          as={Link}
          href="#"
          variant="ghost"
          alignItems="center"
          color={["black", "white"]}
          display="flex"
          justifyContent="left"
          _hover={{
            textDecor: "none",
          }}
          onClick={(event) => event.preventDefault()}
        >
          <ArrowRightLeftIcon />
          <Text>Change account</Text>
        </Button>

        <Button
          as={Link}
          variant="ghost"
          alignItems="center"
          color={["black", "white"]}
          display="flex"
          justifyContent="left"
          _hover={{
            textDecor: "none",
          }}
          onClick={(event) => event.preventDefault()}
        >
          <LogOutIcon />
          <Text>Logout</Text>
        </Button>
      </Box>
    </VStack>
  )
}

export default NavbarWithSegmentedControl
