import type { Component, IconProps } from "@yamada-ui/react"
import type { FC } from "react"
import {
  ArrowRightLeftIcon,
  CalendarIcon,
  FingerprintIcon,
  GaugeIcon,
  HouseIcon,
  LaptopIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "@yamada-ui/lucide"
import {
  Avatar,
  Box,
  Center,
  IconButton,
  Tooltip,
  VStack,
} from "@yamada-ui/react"
import { useState } from "react"

const mockdata = [
  { icon: HouseIcon, label: "Home" },
  { icon: GaugeIcon, label: "Dashboard" },
  { icon: LaptopIcon, label: "Analytics" },
  { icon: CalendarIcon, label: "Releases" },
  { icon: UserIcon, label: "Account" },
  { icon: FingerprintIcon, label: "Security" },
  { icon: SettingsIcon, label: "Settings" },
]

interface NavbarLinkProps {
  icon: Component<"svg", IconProps>
  label: string
  active?: boolean
  onClick?(): void
}

function NavbarLink({ active, icon: Icon, label, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} placement="right">
      <IconButton
        as={Center}
        colorScheme={active ? "primary" : undefined}
        variant={active ? "solid" : "ghost"}
        data-active={active || undefined}
        borderRadius="md"
        h="50px"
        icon={<Icon fontSize="xl" />}
        w="50px"
        onClick={onClick}
      />
    </Tooltip>
  )
}

const NavbarWithTooltips: FC = () => {
  const [active, setActive] = useState(0)

  return (
    <VStack
      borderRight="1px solid"
      borderRightColor="border"
      h="full"
      minH="750px"
      p="md"
      w="80px"
    >
      <Center>
        <Avatar
          src="https://avatars.githubusercontent.com/u/84060430?v=4"
          size="sm"
        />
      </Center>

      <Box flex={1} mt="xl">
        <VStack gap={0}>
          {mockdata.map((link, index) => (
            <NavbarLink
              {...link}
              key={link.label}
              active={index === active}
              onClick={() => setActive(index)}
            />
          ))}
        </VStack>
      </Box>

      <VStack gap={0}>
        <NavbarLink icon={ArrowRightLeftIcon} label="Change account" />
        <NavbarLink icon={LogOutIcon} label="Logout" />
      </VStack>
    </VStack>
  )
}

export default NavbarWithTooltips
