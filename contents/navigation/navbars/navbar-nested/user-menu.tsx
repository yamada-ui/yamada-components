import type { Token } from "@yamada-ui/react"
import type { Placement } from "./types"
import {
  ArrowLeftRightIcon,
  ChevronRightIcon,
  HeartIcon,
  LogOutIcon,
  MessageSquareIcon,
  PauseIcon,
  SettingsIcon,
  StarIcon,
  TrashIcon,
} from "@yamada-ui/lucide"
import {
  Avatar,
  Button,
  Grid,
  memo,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
  useBreakpointValue,
} from "@yamada-ui/react"

export const UserMenu = memo(() => {
  const placement = useBreakpointValue<Token<Placement>>({
    base: "right-start",
    md: "auto-start",
  })
  return (
    <Menu offset={[-20, -20]} placement={placement}>
      <MenuButton
        as={Button}
        variant="ghost"
        h="fit-content"
        px="0"
        rounded="0"
        _hover={{ bg: ["blackAlpha.200", "blackAlpha.400"] }}
      >
        <Grid
          alignItems="center"
          gap="md"
          p="md"
          templateColumns="auto 1fr auto"
          w="full"
        >
          <Avatar
            name="taroj1205"
            src="https://avatars.githubusercontent.com/u/61367823?v=4"
            p="1"
          />
          <Grid gap="sm" py="sm" templateRows="repeat(2, 1fr)">
            <Text fontSize="sm" fontWeight="semibold" lineHeight="1">
              Shintaro Jokagi
            </Text>
            <Text
              color="muted"
              fontSize="sm"
              fontWeight="normal"
              lineHeight="1"
            >
              taroj1205@yamada-ui.com
            </Text>
          </Grid>
          <ChevronRightIcon h="5" w="5" />
        </Grid>
      </MenuButton>
      <MenuList>
        <MenuItem fontSize="sm" icon={<HeartIcon color="pink.500" />}>
          Liked posts
        </MenuItem>
        <MenuItem fontSize="sm" icon={<StarIcon color="yellow.500" />}>
          Saved posts
        </MenuItem>
        <MenuItem fontSize="sm" icon={<MessageSquareIcon color="blue.500" />}>
          Your comments
        </MenuItem>
        <MenuGroup
          label="Settings"
          labelProps={{
            fontSize: "xs",
            fontWeight: "medium",
          }}
        >
          <MenuItem fontSize="sm" icon={<SettingsIcon />}>
            Account settings
          </MenuItem>
          <MenuItem fontSize="sm" icon={<ArrowLeftRightIcon />}>
            Change account
          </MenuItem>
          <MenuItem fontSize="sm" icon={<LogOutIcon />}>
            Logout
          </MenuItem>
        </MenuGroup>

        <MenuDivider />

        <MenuGroup
          label="Danger zone"
          labelProps={{
            fontSize: "xs",
            fontWeight: "medium",
          }}
        >
          <MenuItem fontSize="sm" icon={<PauseIcon />}>
            Pause subscription
          </MenuItem>
          <MenuItem
            color="danger"
            fontSize="sm"
            icon={<TrashIcon color="danger" />}
          >
            Delete account
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  )
})

UserMenu.displayName = "UserMenu"
