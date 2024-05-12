import type { IconButtonProps, MenuProps } from "@yamada-ui/react"
import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuOptionItem,
  useBreakpointValue,
  useColorMode,
} from "@yamada-ui/react"
import type { FC } from "react"
import { memo } from "react"
import { Moon, Sun } from "components/media-and-icons"

export type ColorModeButtonProps = IconButtonProps & {
  menuProps?: MenuProps
}

export const ColorModeButton: FC<ColorModeButtonProps> = memo(
  ({ menuProps, ...rest }) => {
    const padding = useBreakpointValue({ base: 32, md: 16 })
    const { colorMode, internalColorMode, changeColorMode } = useColorMode()

    return (
      <Menu
        placement="bottom"
        modifiers={[
          {
            name: "preventOverflow",
            options: {
              padding: {
                top: padding,
                bottom: padding,
                left: padding,
                right: padding,
              },
            },
          },
        ]}
        restoreFocus={false}
        {...menuProps}
      >
        <MenuButton
          as={IconButton}
          aria-label="Open color mode switching menu"
          variant="ghost"
          color="muted"
          icon={colorMode === "dark" ? <Sun /> : <Moon />}
          {...rest}
        />

        <MenuList>
          <MenuOptionGroup<string>
            value={internalColorMode}
            onChange={changeColorMode}
            type="radio"
          >
            <MenuOptionItem value="light" closeOnSelect>
              Light
            </MenuOptionItem>
            <MenuOptionItem value="dark" closeOnSelect>
              Dark
            </MenuOptionItem>
            <MenuOptionItem value="system" closeOnSelect>
              System
            </MenuOptionItem>
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    )
  },
)

ColorModeButton.displayName = "ColorModeButton"
