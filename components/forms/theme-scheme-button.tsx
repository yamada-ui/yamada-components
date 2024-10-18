import type { BoxProps, IconButtonProps, PopoverProps } from "@yamada-ui/react"
import type { FC } from "react"
import { PaletteIcon } from "@yamada-ui/lucide"
import {
  Box,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Ripple,
  useDisclosure,
  useRipple,
  useTheme,
} from "@yamada-ui/react"
import { memo } from "react"

export type ThemeSchemeButtonProps = {
  popoverProps?: PopoverProps
} & IconButtonProps

export const ThemeSchemeButton: FC<ThemeSchemeButtonProps> = memo(
  ({ popoverProps, ...rest }) => {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const { changeThemeScheme, theme } = useTheme()
    const { colorSchemes = [] } = theme

    return (
      <Popover
        {...popoverProps}
        closeOnButton={false}
        isOpen={isOpen}
        placement="bottom"
        restoreFocus={false}
        onClose={onClose}
        onOpen={onOpen}
      >
        <PopoverTrigger>
          <IconButton
            variant="ghost"
            aria-label="Open color mode switching menu"
            color="muted"
            icon={<PaletteIcon fontSize="2xl" />}
            {...rest}
          />
        </PopoverTrigger>

        <PopoverContent>
          <PopoverBody
            display="grid"
            gridTemplateColumns={{ base: "repeat(4, 1fr)" }}
          >
            {colorSchemes.map((colorScheme: string) => (
              <ColorButton
                key={colorScheme}
                colorScheme={colorScheme}
                onClick={() => {
                  changeThemeScheme(colorScheme)
                  onClose()
                }}
              />
            ))}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    )
  },
)

ThemeSchemeButton.displayName = "ThemeSchemeButton"

type ColorButtonProps = {
  colorScheme: string
} & BoxProps

const ColorButton: FC<ColorButtonProps> = memo(({ colorScheme, ...rest }) => {
  const { onPointerDown, ...rippleProps } = useRipple({})

  return (
    <Box
      as="button"
      type="button"
      bg={`${colorScheme}.500`}
      boxShadow="inner"
      minH={{ base: "12", md: "10" }}
      minW={{ base: "12", md: "10" }}
      outline="0"
      overflow="hidden"
      position="relative"
      rounded="md"
      transitionDuration="slower"
      transitionProperty="common"
      _active={{ bg: `${colorScheme}.700` }}
      _focusVisible={{ shadow: "outline" }}
      _hover={{ bg: `${colorScheme}.600` }}
      {...rest}
      onPointerDown={onPointerDown}
    >
      <Ripple {...rippleProps} />
    </Box>
  )
})

ColorButton.displayName = "ColorButton"
