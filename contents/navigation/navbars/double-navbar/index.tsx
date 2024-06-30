import {
  BarChart3Icon,
  CalendarIcon,
  FingerprintIcon,
  GaugeIcon,
  HomeIcon,
  Settings,
  UserIcon,
} from "@yamada-ui/lucide"
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  IconButton,
  Link,
  Tooltip,
  VStack,
} from "@yamada-ui/react"
import { useState, type FC } from "react"

const mainLinksMockdata = [
  { icon: HomeIcon, label: "Home" },
  { icon: GaugeIcon, label: "Dashboard" },
  { icon: BarChart3Icon, label: "Analytics" },
  { icon: CalendarIcon, label: "Releases" },
  { icon: UserIcon, label: "Account" },
  { icon: FingerprintIcon, label: "Security" },
  { icon: Settings, label: "Settings" },
]

const linksMockdata = [
  "Security",
  "Settings",
  "Dashboard",
  "Releases",
  "Account",
  "Orders",
  "Clients",
  "Databases",
  "Pull Requests",
  "Open Issues",
  "Wiki pages",
]

const DoubleNavbar: FC = () => {
  const [active, setActive] = useState<string>(mainLinksMockdata[0].label)
  const [activeLink, setActiveLink] = useState<string>(linksMockdata[0])

  return (
    <VStack
      as="nav"
      w="300px"
      minH="750px"
      h="full"
      bgColor={["whiteAlpha.500", "blackAlpha.500"]}
      borderRight="1px solid"
      borderRightColor={["blackAlpha.500", "whiteAlpha.500"]}
    >
      <Flex flex={1}>
        <VStack
          alignItems="center"
          as="aside"
          flex="0 0 calc(3.75rem * 1)"
          pt="md"
        >
          <Center>
            <Avatar
              name="Hirotomo Yamada"
              src="https://avatars.githubusercontent.com/u/84060430?v=4"
              size="sm"
            />
          </Center>
          {mainLinksMockdata.map((link) => (
            <Tooltip key={link.label} placement="right">
              <IconButton
                onClick={(e) => {
                  e.preventDefault()
                  setActive(link.label)
                }}
                w="44px"
                h="44px"
                borderRadius="md"
                as={Center}
                colorScheme={active === link.label ? "primary" : undefined}
                variant={active === link.label ? "solid" : "ghost"}
                data-active={active === link.label || undefined}
                icon={<link.icon size="xl" />}
              />
            </Tooltip>
          ))}
        </VStack>
        <Box flex={1} bgColor={["gray.50", "gray.900"]} pr="md">
          <Heading mb="xl" p="md" pt="18px" h="80px">
            {active}
          </Heading>
          {linksMockdata.map((link) => (
            <Button
              as={Link}
              key={link}
              data-active={activeLink === link || undefined}
              href="#"
              onClick={(event) => {
                event.preventDefault()
                setActiveLink(link)
              }}
              variant="ghost"
              display="flex"
              justifyContent="left"
              alignItems="center"
              {...(link === activeLink
                ? {
                    color: "white",
                    backgroundColor: "primary",
                  }
                : {})}
              _hover={{
                textDecor: "none",
                background:
                  link === activeLink ? undefined : "rgba(224, 97, 6, 0.12)",
              }}
              borderTopLeftRadius={0}
              borderBottomLeftRadius={0}
            >
              {link}
            </Button>
          ))}
        </Box>
      </Flex>
    </VStack>
  )
}

export default DoubleNavbar
