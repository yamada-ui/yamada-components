import { ChevronDownIcon } from "@yamada-ui/lucide"
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@yamada-ui/react"
import type { FC } from "react"

const items = [
  "Analytics",
  "Engagement",
  "Security",
  "Integrations",
  "Automations",
  "Reports",
]

const SimpleMenu: FC = () => {
  return (
    <Menu>
      <MenuButton as={Button} variant="ghost" rightIcon={<ChevronDownIcon />}>
        Solutions
      </MenuButton>

      <MenuList>
        {items.map((item, i) => (
          <MenuItem key={i}>{item}</MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default SimpleMenu
