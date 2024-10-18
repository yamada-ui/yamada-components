import type {
  CenterProps,
  IconButtonProps,
  MenuProps,
  UseDisclosureReturn,
} from "@yamada-ui/react"
import type { FC } from "react"
import type { Locale } from "utils/i18n"
import { LanguagesIcon, MenuIcon } from "@yamada-ui/lucide"
import {
  Box,
  Center,
  CloseButton,
  forwardRef,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuOptionItem,
  mergeRefs,
  useBreakpointValue,
  useDisclosure,
  useMotionValueEvent,
  useScroll,
} from "@yamada-ui/react"
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
import Link from "next/link"
import { memo, useRef, useState } from "react"

export type HeaderProps = {} & CenterProps

export const Header = memo(
  forwardRef<HeaderProps, "div">(({ ...rest }, ref) => {
    const headerRef = useRef<HTMLHeadingElement>()
    const { scrollY } = useScroll()
    const [y, setY] = useState<number>(0)
    const { isOpen, onClose, onOpen } = useDisclosure()
    const { height = 0 } = headerRef.current?.getBoundingClientRect() ?? {}

    useMotionValueEvent(scrollY, "change", setY)

    const isScroll = y > height

    return (
      <>
        <Center
          ref={mergeRefs(ref, headerRef)}
          as="header"
          backdropBlur="10px"
          backdropFilter="auto"
          backdropSaturate="180%"
          bg={isScroll ? ["whiteAlpha.500", "blackAlpha.200"] : undefined}
          left="0"
          position="sticky"
          right="0"
          shadow={isScroll ? ["base", "dark-sm"] : undefined}
          top="0"
          transitionDuration="slower"
          transitionProperty="common"
          w="full"
          zIndex="guldo"
          {...rest}
        >
          <HStack maxW="9xl" px={{ base: "lg", md: "md" }} py="3" w="full">
            <Box
              as={Link}
              href="/"
              aria-label="Yamada UI"
              flex="1"
              rounded="md"
              transitionDuration="slower"
              transitionProperty="opacity"
              _focus={{ outline: "none" }}
              _focusVisible={{ boxShadow: "outline" }}
              _hover={{ opacity: 0.7 }}
            >
              <Heading fontSize="2xl" whiteSpace="nowrap">
                Yamada Components
              </Heading>
            </Box>

            <Search
              backdropBlur="10px"
              backdropFilter="auto"
              backdropSaturate="180%"
              bg={
                isScroll
                  ? ["whiteAlpha.600", "blackAlpha.500"]
                  : ["white", "black"]
              }
              borderColor={isScroll ? "transparent" : "border"}
              display={{ base: "flex", md: "none" }}
            />

            <ButtonGroup {...{ isOpen, onOpen }} />
          </HStack>
        </Center>

        <MobileMenu
          header={<ButtonGroup isMobile {...{ isOpen, onClose }} />}
          isOpen={isOpen}
          onClose={onClose}
        >
          <Tree py="sm" />
        </MobileMenu>
      </>
    )
  }),
)

type ButtonGroupProps = { isMobile?: boolean } & Partial<UseDisclosureReturn>

const ButtonGroup: FC<ButtonGroupProps> = memo(
  ({ isMobile, isOpen, onClose, onOpen }) => {
    return (
      <HStack gap="sm">
        <SearchButton
          display={{
            base: "none",
            sm: "none",
            md: !isMobile ? "inline-flex" : undefined,
          }}
        />

        <NextLinkIconButton
          href={CONSTANT.SNS.DISCORD}
          variant="ghost"
          aria-label="GitHub repository"
          color="muted"
          display={{ base: "inline-flex", lg: !isMobile ? "none" : undefined }}
          icon={<Discord />}
          isExternal
        />

        <NextLinkIconButton
          href={CONSTANT.SNS.GITHUB.YAMADA_COMPONENTS}
          variant="ghost"
          aria-label="Discord server"
          color="muted"
          display={{ base: "inline-flex", lg: !isMobile ? "none" : undefined }}
          icon={<Github />}
          isExternal
        />

        <ThemeSchemeButton
          display={{ base: "inline-flex", lg: !isMobile ? "none" : undefined }}
        />
        {
          /* eslint-disable @typescript-eslint/no-unnecessary-condition */
          CONSTANT.I18N.LOCALES.length > 1 ? (
            <I18nButton
              display={{
                base: "inline-flex",
                md: !isMobile ? "none" : undefined,
              }}
            />
          ) : null
        }

        <ColorModeButton />

        {!isOpen ? (
          <IconButton
            variant="ghost"
            aria-label="Open navigation menu"
            color="muted"
            display={{ base: "none", lg: "inline-flex" }}
            icon={<MenuIcon fontSize="2xl" />}
            onClick={onOpen}
          />
        ) : (
          <CloseButton
            size="lg"
            aria-label="Close navigation menu"
            color="muted"
            display={{ base: "none", lg: "inline-flex" }}
            onClick={onClose}
          />
        )}
      </HStack>
    )
  },
)

ButtonGroup.displayName = "ButtonGroup"

type I18nButtonProps = {
  menuProps?: MenuProps
} & IconButtonProps

const I18nButton: FC<I18nButtonProps> = memo(({ menuProps, ...rest }) => {
  const padding = useBreakpointValue({ base: 32, md: 16 })
  const { changeLocale, locale } = useI18n()

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
        aria-label="Open language switching menu"
        color="muted"
        icon={<LanguagesIcon fontSize="2xl" />}
        {...rest}
      />

      <MenuList>
        <MenuOptionGroup<Locale>
          type="radio"
          value={locale}
          onChange={changeLocale}
        >
          {CONSTANT.I18N.LOCALES.map(({ label, value }) => (
            <MenuOptionItem key={value} closeOnSelect value={value}>
              {label}
            </MenuOptionItem>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
})

I18nButton.displayName = "I18nButton"
