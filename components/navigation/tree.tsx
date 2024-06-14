import {
  Compass,
  ExternalLink,
  GitPullRequestArrow,
  Layers,
  LayoutTemplate,
  LineChart,
  Navigation,
  Paintbrush,
  PanelsTopLeft,
  Table,
  Tags,
  TextCursorInput,
  Text as TextIcon,
} from "@yamada-ui/lucide"
import {
  Center,
  ChevronIcon,
  Collapse,
  HStack,
  List,
  ListItem,
  Text,
  dataAttr,
  forwardRef,
  isString,
  useBoolean,
} from "@yamada-ui/react"
import type { IconProps, ListProps } from "@yamada-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { memo, useEffect } from "react"
import type { FC } from "react"
import type { ComponentCategoryGroup } from "component"
import { YamadaUI } from "components/media-and-icons"
import { CONSTANT } from "constant"
import { useApp } from "contexts/app-context"
import { useI18n } from "contexts/i18n-context"

export type TreeProps = ListProps

export const Tree = memo(
  forwardRef<TreeProps, "div">(({ ...rest }, ref) => {
    const { componentTree } = useApp()
    const { t, locale } = useI18n()
    const { pathname } = useRouter()

    return (
      <List ref={ref} gap="sm" fontSize="sm" {...rest}>
        <ListItemLink
          isSelected={pathname === "/"}
          icon="compass"
          slug="/"
          title={t("component.tree.home")}
        />

        {componentTree.map((document) => (
          <RecursiveListItem key={document.slug} {...document} />
        ))}

        {CONSTANT.MENU.map(({ icon, name, href, isExternal }) => (
          <ListItemLink
            key={name}
            icon={icon}
            slug={isString(href) ? href : href[locale]}
            title={t(`component.tree.${name}`)}
            isExternal={isExternal}
          />
        ))}
      </List>
    )
  }),
)

type RecursiveListItemProps = ComponentCategoryGroup & { isNested?: boolean }

const RecursiveListItem: FC<RecursiveListItemProps> = memo(
  ({ icon, title, slug, items = [], isNested, isExpanded }) => {
    const [isOpen, { on, toggle }] = useBoolean(isExpanded)

    useEffect(() => {
      if (isExpanded) on()
    }, [isExpanded, on])

    const isChildExpanded = items.some(({ isExpanded }) => isExpanded)
    const isSelected = !isChildExpanded && isExpanded
    const hasItems = !!items.length
    const isComponent = slug.split("/").length === 4

    return (
      <ListItem>
        <ListItemLink
          {...{
            icon,
            title,
            slug,
            isNested,
            isSelected,
            isOpen,
            withToggleButton: hasItems,
            isComponent,
            onToggle: toggle,
          }}
        />

        {hasItems ? (
          <Collapse isOpen={isOpen} unmountOnExit>
            <List mt="sm" gap="sm" borderLeftWidth="1px" ml="3" pl="3">
              {items.map((doc) => (
                <RecursiveListItem key={doc.slug} {...doc} isNested />
              ))}
            </List>
          </Collapse>
        ) : null}
      </ListItem>
    )
  },
  () => false,
)

RecursiveListItem.displayName = "RecursiveListItem"

type ListItemLinkProps = Pick<
  RecursiveListItemProps,
  "title" | "slug" | "isNested" | "icon"
> & {
  isSelected?: boolean
  isComponent?: boolean
  isOpen?: boolean
  withToggleButton?: boolean
  onToggle?: () => void
  isExternal?: boolean
}

const ListItemLink: FC<ListItemLinkProps> = memo(
  ({
    icon,
    title,
    slug,
    isNested,
    isOpen,
    isSelected,
    isComponent,
    withToggleButton,
    onToggle,
    isExternal,
  }) => {
    isExternal ??= isComponent

    return (
      <HStack
        data-selected={dataAttr(isSelected)}
        w="full"
        cursor="pointer"
        userSelect="none"
        rounded="md"
        gap="0"
        color={isNested ? "muted" : undefined}
        _selected={{
          color: [`black`, "white"],
          bg: [`primary.300`, `primary.300`],
        }}
        _hover={{
          color: ["black", "white"],
          bg: !isSelected ? [`blackAlpha.400`, "whiteAlpha.400"] : undefined,
        }}
        _active={{
          bg: !isSelected ? ["blackAlpha.500", "whiteAlpha.500"] : undefined,
        }}
        transitionProperty="colors"
        transitionDuration="normal"
        position="relative"
        _before={{
          content: "''",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bg: "white",
          opacity: 0.8,
        }}
        _dark={{
          _before: {
            bg: "black",
            opacity: 0.86,
          },
        }}
      >
        <Text
          as={Link}
          href={slug}
          position="static"
          zIndex="yamcha"
          display="inline-flex"
          alignItems="center"
          pl="3"
          pr={!withToggleButton ? "3" : undefined}
          py="sm"
          flex="1"
          rounded="md"
          _focus={{ outline: "none" }}
          _focusVisible={{ boxShadow: "inline" }}
          onClick={!isOpen ? onToggle : undefined}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener" : undefined}
        >
          <ListItemIcon icon={icon} color="muted" me="sm" />

          <Text as="span" flex="1" lineClamp={1}>
            {title}
          </Text>

          {isComponent ? <ExternalLink fontSize="1.25em" /> : null}
        </Text>

        {withToggleButton ? (
          <Center
            as="button"
            position="static"
            zIndex="yamcha"
            p="sm"
            fontSize="1.5em"
            rounded="md"
            boxSizing="content-box"
            _focus={{ outline: "none" }}
            _focusVisible={{ boxShadow: "inline" }}
            onClick={onToggle}
            aria-label="Toggle children"
          >
            <ChevronIcon
              transform={isOpen ? undefined : "rotate(-90deg)"}
              transitionProperty="transform"
              transitionDuration="slow"
            />
          </Center>
        ) : null}
      </HStack>
    )
  },
)

ListItemLink.displayName = "ListItemLink"

type ListItemIconProps = { icon?: string | null } & IconProps

const ListItemIcon: FC<ListItemIconProps> = memo(({ icon, ...rest }) => {
  switch (icon) {
    case "compass":
      return <Compass fontSize="2xl" {...rest} />

    case "panels-top-left":
      return <PanelsTopLeft fontSize="2xl" {...rest} />

    case "text-cursor-input":
      return <TextCursorInput fontSize="2xl" {...rest} />

    case "layout-template":
      return <LayoutTemplate fontSize="2xl" {...rest} />

    case "line-chart":
      return <LineChart fontSize="2xl" {...rest} />

    case "table":
      return <Table fontSize="2xl" {...rest} />

    case "layers":
      return <Layers fontSize="2xl" {...rest} />

    case "navigation":
      return <Navigation fontSize="2xl" {...rest} />

    case "text":
      return <TextIcon fontSize="2xl" {...rest} />

    case "tags":
      return <Tags fontSize="2xl" {...rest} />

    case "git-pull-request-arrow":
      return <GitPullRequestArrow fontSize="2xl" {...rest} />

    case "yamada-ui":
      return <YamadaUI boxSize="1.5rem" {...rest} />

    case "paintbrush":
      return <Paintbrush fontSize="2xl" {...rest} />

    default:
      return <></>
  }
})

ListItemIcon.displayName = "ListItemIcon"
