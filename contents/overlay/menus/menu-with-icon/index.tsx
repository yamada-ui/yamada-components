import {
  ChevronDownIcon,
  ChartBarIcon,
  MousePointerClickIcon,
  FingerprintIcon,
  WorkflowIcon,
  RefreshCcwIcon,
} from "@yamada-ui/lucide"
import {
  Button,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from "@yamada-ui/react"
import type { FC } from "react"

const items = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    icon: ChartBarIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers",
    icon: MousePointerClickIcon,
  },
  {
    name: "Security",
    description: "Your customers' data will be safe and secure",
    icon: FingerprintIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools",
    icon: WorkflowIcon,
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
    icon: RefreshCcwIcon,
  },
]

const MenuWithIcon: FC = () => {
  return (
    <Menu>
      <MenuButton as={Button} variant="ghost" rightIcon={<ChevronDownIcon />}>
        Solutions
      </MenuButton>

      <MenuList>
        {items.map((item, i) => (
          <MenuItem key={i} as={HStack} gap="md" py="md">
            <item.icon size="xl" />
            <VStack alignItems="start">
              <Text
                as={Link}
                onClick={(e) => e.preventDefault()}
                color={["black", "white"]}
                _hover={{ textDecor: "none" }}
              >
                {item.name}
              </Text>
              <Text color={["blackAlpha.500", "whiteAlpha.500"]}>
                {item.description}
              </Text>
            </VStack>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default MenuWithIcon
