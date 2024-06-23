import {
  ArrowRightLeft,
  BellRing,
  Database,
  Fingerprint,
  Key,
  LogOut,
  Receipt,
  Settings,
  Users,
} from "@yamada-ui/lucide"
import {
  Badge,
  Box,
  Button,
  HStack,
  Heading,
  Link,
  Text,
  VStack,
} from "@yamada-ui/react"
import { useState, type FC } from "react"

const data = [
  { link: "", label: "Notifications", icon: BellRing },
  { link: "", label: "Billing", icon: Receipt },
  { link: "", label: "Security", icon: Fingerprint },
  { link: "", label: "SSH Keys", icon: Key },
  { link: "", label: "Databases", icon: Database },
  { link: "", label: "Authentication", icon: Users },
  { link: "", label: "Other Settings", icon: Settings },
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
            size="lg"
            whiteSpace="nowrap"
            color="white"
            onClick={(e) => e.preventDefault()}
          >
            Yamada UI
          </Heading>
          <Badge fontWeight={700}>v2.0.0</Badge>
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
          <ArrowRightLeft />
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
          <LogOut />
          <Text>Logout</Text>
        </Button>
      </Box>
    </VStack>
  )
}

export default SimpleNavbar
