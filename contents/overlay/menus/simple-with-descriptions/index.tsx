import { ChevronDownIcon } from "@yamada-ui/lucide"
import {
  Button,
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
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers",
  },
  {
    name: "Security",
    description: "Your customers' data will be safe and secure",
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools",
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
  },
]

const SimpleWithDescriptions: FC = () => {
  return (
    <Menu>
      <MenuButton as={Button} variant="ghost" rightIcon={<ChevronDownIcon />}>
        Solutions
      </MenuButton>

      <MenuList>
        {items.map((item, i) => (
          <MenuItem key={i} as={VStack} alignItems="start" py="md">
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
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default SimpleWithDescriptions
