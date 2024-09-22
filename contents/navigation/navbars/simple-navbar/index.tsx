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
  HStack,
  Heading,
  Link,
  Tag,
  Text,
  VStack,
} from "@yamada-ui/react"
import { useState, type FC } from "react"

const data = [
  { link: "", label: "Notifications", icon: BellRingIcon },
  { link: "", label: "Billing", icon: ReceiptIcon },
  { link: "", label: "Security", icon: FingerprintIcon },
  { link: "", label: "SSH Keys", icon: KeyIcon },
  { link: "", label: "Databases", icon: DatabaseIcon },
  { link: "", label: "Authentication", icon: UsersIcon },
  { link: "", label: "Other Settings", icon: SettingsIcon },
]

const SimpleNavbar: FC = () => {
  const [active, setActive] = useState<string>(data[0]["label"])

  return (
    <VStack
      as="nav"
      w="300px"
      minH="700px"
      h="full"
      p="md"
      backgroundColor="primary"
    >
      <Box flex={1}>
        <HStack
          justifyContent="space-between"
          pb="md"
          mb="md"
          as="header"
          borderBottom="1px solid"
          borderBottomColor="white"
        >
          <Heading
            as="a"
            size="md"
            whiteSpace="nowrap"
            color="white"
            onClick={(e) => e.preventDefault()}
          >
            Yamada UI
          </Heading>
          <Tag fontWeight={500} fontSize="xs">
            v2.0.0
          </Tag>
        </HStack>
        {data.map((item) => (
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
                  color: "primary",
                  backgroundColor: "white",
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
        pt="md"
        mt="md"
      >
        <Button
          as={Link}
          href="#"
          onClick={(event) => event.preventDefault()}
          variant="ghost"
          color="white"
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
          color="white"
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

export default SimpleNavbar
