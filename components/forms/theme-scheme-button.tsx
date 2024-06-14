import { Palette } from "@yamada-ui/lucide"
import type { BoxProps, IconButtonProps, PopoverProps } from "@yamada-ui/react"
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
import type { FC } from "react"
import { memo } from "react"

export type ThemeSchemeButtonProps = IconButtonProps & {
  popoverProps?: PopoverProps
}

export const ThemeSchemeButton: FC<ThemeSchemeButtonProps> = memo(
  ({ popoverProps, ...rest }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { theme, changeThemeScheme } = useTheme()
    const { colorSchemes = [] } = theme

    return (
      <Popover
        {...popoverProps}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement="bottom"
        closeOnButton={false}
        restoreFocus={false}
      >
        <PopoverTrigger>
          <IconButton
            aria-label="Open color mode switching menu"
            variant="ghost"
            color="muted"
            icon={<Palette fontSize="2xl" />}
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

type ColorButtonProps = BoxProps & {
  colorScheme: string
}

const ColorButton: FC<ColorButtonProps> = memo(({ colorScheme, ...rest }) => {
  const { onPointerDown, ...rippleProps } = useRipple({})

  return (
    <Box
      as="button"
      type="button"
      position="relative"
      overflow="hidden"
      bg={`${colorScheme}.500`}
      minW={{ base: "12", md: "10" }}
      minH={{ base: "12", md: "10" }}
      rounded="md"
      boxShadow="inner"
      outline="0"
      _hover={{ bg: `${colorScheme}.600` }}
      _active={{ bg: `${colorScheme}.700` }}
      _focusVisible={{ shadow: "outline" }}
      transitionProperty="common"
      transitionDuration="slower"
      {...rest}
      onPointerDown={onPointerDown}
    >
      <Ripple {...rippleProps} />
    </Box>
  )
})

ColorButton.displayName = "ColorButton"
