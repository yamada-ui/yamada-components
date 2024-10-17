import type { FC } from "react"
import {
  ArrowRightLeftIcon,
  BellRingIcon,
  DatabaseIcon,
  FingerprintIcon,
  KeyIcon,
  LogOutIcon,
  ReceiptIcon,
  SettingsIcon,
  UsersIcon,
} from "@yamada-ui/lucide"
import {
  Box,
  Button,
  Heading,
  HStack,
  Link,
  Tag,
  Text,
  VStack,
} from "@yamada-ui/react"
import { useState } from "react"

const data = [
  { icon: BellRingIcon, label: "Notifications", link: "" },
  { icon: ReceiptIcon, label: "Billing", link: "" },
  { icon: FingerprintIcon, label: "Security", link: "" },
  { icon: KeyIcon, label: "SSH Keys", link: "" },
  { icon: DatabaseIcon, label: "Databases", link: "" },
  { icon: UsersIcon, label: "Authentication", link: "" },
  { icon: SettingsIcon, label: "Other Settings", link: "" },
]

const SimpleNavbar: FC = () => {
  const [active, setActive] = useState<string>(data[0]?.label || "")

  return (
    <VStack
      as="nav"
      backgroundColor="primary"
      h="full"
      minH="700px"
      p="md"
      w="300px"
    >
      <Box flex={1}>
        <HStack
          as="header"
          borderBottom="1px solid"
          borderBottomColor="white"
          justifyContent="space-between"
          mb="md"
          pb="md"
        >
          <Heading
            as="a"
            size="md"
            color="white"
            whiteSpace="nowrap"
            onClick={(e) => e.preventDefault()}
          >
            Yamada UI
          </Heading>
          <Tag fontSize="xs" fontWeight={500}>
            v2.0.0
          </Tag>
        </HStack>
        {data.map((item) => (
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
                  backgroundColor: "white",
                  color: "primary",
                }
              : {
                  color: "white",
                })}
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

      <Box
        as="footer"
        borderTop="1px solid"
        borderTopColor="white"
        mt="md"
        pt="md"
      >
        <Button
          as={Link}
          href="#"
          variant="ghost"
          alignItems="center"
          color="white"
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
          color="white"
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

export default SimpleNavbar
