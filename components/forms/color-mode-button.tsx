import type { ColorMode, IconButtonProps, MenuProps } from "@yamada-ui/react"
import type { FC } from "react"
import { MoonIcon, SunIcon } from "@yamada-ui/lucide"
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
import { memo } from "react"

export type ColorModeButtonProps = {
  menuProps?: MenuProps
} & IconButtonProps

export const ColorModeButton: FC<ColorModeButtonProps> = memo(
  ({ menuProps, ...rest }) => {
    const padding = useBreakpointValue({ base: 32, md: 16 })
    const { changeColorMode, colorMode, internalColorMode } = useColorMode()

    return (
      <Menu
        modifiers={[
          {
            name: "preventOverflow",
            options: {
              padding: {
                bottom: padding,
                left: padding,
                right: padding,
                top: padding,
              },
            },
          },
        ]}
        placement="bottom"
        restoreFocus={false}
        {...menuProps}
      >
        <MenuButton
          as={IconButton}
          variant="ghost"
          aria-label="Open color mode switching menu"
          color="muted"
          icon={
            colorMode === "dark" ? (
              <SunIcon fontSize="2xl" />
            ) : (
              <MoonIcon fontSize="2xl" />
            )
          }
          {...rest}
        />

        <MenuList>
          <MenuOptionGroup<"system" | ColorMode>
            type="radio"
            value={internalColorMode}
            onChange={changeColorMode}
          >
            <MenuOptionItem closeOnSelect value="light">
              Light
            </MenuOptionItem>
            <MenuOptionItem closeOnSelect value="dark">
              Dark
            </MenuOptionItem>
            <MenuOptionItem closeOnSelect value="system">
              System
            </MenuOptionItem>
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    )
  },
)

ColorModeButton.displayName = "ColorModeButton"
