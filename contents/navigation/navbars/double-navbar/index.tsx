import type { FC } from "react"
import {
  CalendarIcon,
  ChartColumnIcon,
  FingerprintIcon,
  GaugeIcon,
  HouseIcon,
  SettingsIcon,
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
import { useState } from "react"

const mainLinksMockdata = [
  { icon: HouseIcon, label: "Home" },
  { icon: GaugeIcon, label: "Dashboard" },
  { icon: ChartColumnIcon, label: "Analytics" },
  { icon: CalendarIcon, label: "Releases" },
  { icon: UserIcon, label: "Account" },
  { icon: FingerprintIcon, label: "Security" },
  { icon: SettingsIcon, label: "Settings" },
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
  const [active, setActive] = useState<string>(
    mainLinksMockdata[0]?.label || "",
  )
  const [activeLink, setActiveLink] = useState<string>(linksMockdata[0] || "")

  return (
    <VStack
      as="nav"
      bgColor={["whiteAlpha.500", "blackAlpha.500"]}
      borderRight="1px solid"
      borderRightColor="border"
      h="full"
      minH="750px"
      w="300px"
    >
      <Flex flex={1}>
        <VStack
          as="aside"
          alignItems="center"
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
                as={Center}
                colorScheme={active === link.label ? "primary" : undefined}
                variant={active === link.label ? "solid" : "ghost"}
                data-active={active === link.label || undefined}
                borderRadius="md"
                h="44px"
                icon={<link.icon fontSize="xl" />}
                w="44px"
                onClick={(e) => {
                  e.preventDefault()
                  setActive(link.label)
                }}
              />
            </Tooltip>
          ))}
        </VStack>
        <Box bgColor={["gray.50", "gray.900"]} flex={1} pr="md">
          <Heading fontSize="2xl" h="80px" mb="xl" p="md" pt="18px">
            {active}
          </Heading>
          {linksMockdata.map((link) => (
            <Button
              key={link}
              as={Link}
              href="#"
              variant="ghost"
              data-active={activeLink === link || undefined}
              alignItems="center"
              display="flex"
              justifyContent="left"
              onClick={(event) => {
                event.preventDefault()
                setActiveLink(link)
              }}
              {...(link === activeLink
                ? {
                    backgroundColor: "primary",
                    color: "white",
                  }
                : {})}
              borderBottomLeftRadius={0}
              borderTopLeftRadius={0}
              _hover={{
                background:
                  link === activeLink ? undefined : ["gray.100", "gray.950"],
                textDecor: "none",
              }}
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
