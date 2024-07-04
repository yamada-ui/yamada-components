import { LanguagesIcon, MenuIcon } from "@yamada-ui/lucide"
import type {
  CenterProps,
  IconButtonProps,
  MenuProps,
  UseDisclosureReturn,
} from "@yamada-ui/react"
import {
  Box,
  Center,
  CloseButton,
  HStack,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuOptionItem,
  forwardRef,
  mergeRefs,
  useBreakpointValue,
  useDisclosure,
  useMotionValueEvent,
  useScroll,
} from "@yamada-ui/react"
import Link from "next/link"
import type { FC } from "react"
import { memo, useRef, useState } from "react"
import {
  ColorModeButton,
  Search,
  SearchButton,
  ThemeSchemeButton,
} from "components/forms"
import { Discord, Github } from "components/media-and-icons"
import { NextLinkIconButton, Tree } from "components/navigation"
import { MobileMenu } from "components/overlay"
import { CONSTANT } from "constant"
import { useI18n } from "contexts/i18n-context"
import type { Locale } from "utils/i18n"

export type HeaderProps = CenterProps & {}

export const Header = memo(
  forwardRef<HeaderProps, "div">(({ ...rest }, ref) => {
    const headerRef = useRef<HTMLHeadingElement>()
    const { scrollY } = useScroll()
    const [y, setY] = useState<number>(0)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { height = 0 } = headerRef.current?.getBoundingClientRect() ?? {}

    useMotionValueEvent(scrollY, "change", setY)

    const isScroll = y > height

    return (
      <>
        <Center
          ref={mergeRefs(ref, headerRef)}
          as="header"
          w="full"
          bg={isScroll ? ["whiteAlpha.500", "blackAlpha.200"] : undefined}
          backdropFilter="auto"
          backdropSaturate="180%"
          backdropBlur="10px"
          shadow={isScroll ? ["base", "dark-sm"] : undefined}
          transitionProperty="common"
          transitionDuration="slower"
          position="sticky"
          top="0"
          left="0"
          right="0"
          zIndex="guldo"
          {...rest}
        >
          <HStack w="full" maxW="9xl" py="3" px={{ base: "lg", md: "md" }}>
            <Box
              as={Link}
              href="/"
              aria-label="Yamada UI"
              _hover={{ opacity: 0.7 }}
              transitionProperty="opacity"
              transitionDuration="slower"
              _focus={{ outline: "none" }}
              _focusVisible={{ boxShadow: "outline" }}
              rounded="md"
              flex="1"
            >
              <Heading fontSize="2xl" whiteSpace="nowrap">
                Yamada Components
              </Heading>
            </Box>

            <Search
              display={{ base: "flex", md: "none" }}
              borderColor={isScroll ? "transparent" : "border"}
              bg={
                isScroll
                  ? ["whiteAlpha.600", "blackAlpha.500"]
                  : ["white", "black"]
              }
              backdropFilter="auto"
              backdropSaturate="180%"
              backdropBlur="10px"
            />

            <ButtonGroup {...{ isOpen, onOpen }} />
          </HStack>
        </Center>

        <MobileMenu
          isOpen={isOpen}
          onClose={onClose}
          header={<ButtonGroup isMobile {...{ isOpen, onClose }} />}
        >
          <Tree py="sm" />
        </MobileMenu>
      </>
    )
  }),
)

type ButtonGroupProps = Partial<UseDisclosureReturn> & { isMobile?: boolean }

const ButtonGroup: FC<ButtonGroupProps> = memo(
  ({ isMobile, isOpen, onOpen, onClose }) => {
    return (
      <HStack gap="sm">
        <SearchButton
          display={{
            base: "none",
            md: !isMobile ? "inline-flex" : undefined,
            sm: "none",
          }}
        />

        <NextLinkIconButton
          href={CONSTANT.SNS.DISCORD}
          isExternal
          aria-label="GitHub repository"
          variant="ghost"
          display={{ base: "inline-flex", lg: !isMobile ? "none" : undefined }}
          color="muted"
          icon={<Discord />}
        />

        <NextLinkIconButton
          href={CONSTANT.SNS.GITHUB.YAMADA_COMPONENTS}
          isExternal
          aria-label="Discord server"
          variant="ghost"
          display={{ base: "inline-flex", lg: !isMobile ? "none" : undefined }}
          color="muted"
          icon={<Github />}
        />

        <ThemeSchemeButton
          display={{ base: "inline-flex", lg: !isMobile ? "none" : undefined }}
        />

        {CONSTANT.I18N.LOCALES.length > 1 ? (
          <I18nButton
            display={{
              base: "inline-flex",
              md: !isMobile ? "none" : undefined,
            }}
          />
        ) : null}

        <ColorModeButton />

        {!isOpen ? (
          <IconButton
            variant="ghost"
            aria-label="Open navigation menu"
            display={{ base: "none", lg: "inline-flex" }}
            color="muted"
            onClick={onOpen}
            icon={<MenuIcon fontSize="2xl" />}
          />
        ) : (
          <CloseButton
            size="lg"
            aria-label="Close navigation menu"
            display={{ base: "none", lg: "inline-flex" }}
            color="muted"
            onClick={onClose}
          />
        )}
      </HStack>
    )
  },
)

ButtonGroup.displayName = "ButtonGroup"

type I18nButtonProps = IconButtonProps & {
  menuProps?: MenuProps
}

const I18nButton: FC<I18nButtonProps> = memo(({ menuProps, ...rest }) => {
  const padding = useBreakpointValue({ base: 32, md: 16 })
  const { locale, changeLocale } = useI18n()

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
        aria-label="Open language switching menu"
        variant="ghost"
        color="muted"
        icon={<LanguagesIcon fontSize="2xl" />}
        {...rest}
      />

      <MenuList>
        <MenuOptionGroup<Locale>
          value={locale}
          onChange={changeLocale}
          type="radio"
        >
          {CONSTANT.I18N.LOCALES.map(({ label, value }) => (
            <MenuOptionItem key={value} value={value} closeOnSelect>
              {label}
            </MenuOptionItem>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
})

I18nButton.displayName = "I18nButton"
