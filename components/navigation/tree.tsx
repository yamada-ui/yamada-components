import type { IconProps, ListProps } from "@yamada-ui/react"
import type { ComponentCategoryGroup } from "component"
import type { FC } from "react"
import {
  ChartLineIcon,
  CompassIcon,
  ExternalLinkIcon,
  GitPullRequestArrowIcon,
  LayersIcon,
  LayoutTemplateIcon,
  NavigationIcon,
  PaintbrushIcon,
  PanelsTopLeftIcon,
  TableIcon,
  TagsIcon,
  TextCursorInputIcon,
  TextIcon,
} from "@yamada-ui/lucide"
import {
  Center,
  ChevronIcon,
  Collapse,
  dataAttr,
  forwardRef,
  HStack,
  isString,
  List,
  ListItem,
  Text,
  useBoolean,
} from "@yamada-ui/react"
import { YamadaUI } from "components/media-and-icons"
import { CONSTANT } from "constant"
import { useApp } from "contexts/app-context"
import { useI18n } from "contexts/i18n-context"
import Link from "next/link"
import { useRouter } from "next/router"
import { memo, useEffect } from "react"

export type TreeProps = ListProps

export const Tree = memo(
  forwardRef<TreeProps, "div">(({ ...rest }, ref) => {
    const { componentTree } = useApp()
    const { locale, t } = useI18n()
    const { pathname } = useRouter()

    return (
      <List ref={ref} fontSize="sm" gap="sm" {...rest}>
        <ListItemLink
          icon="compass"
          isSelected={pathname === "/"}
          slug="/"
          title={t("component.tree.home")}
        />

        {componentTree.map((document) => (
          <RecursiveListItem key={document.slug} {...document} />
        ))}

        {CONSTANT.MENU.map(({ href, name, icon, isExternal }) => (
          <ListItemLink
            key={name}
            icon={icon}
            isExternal={isExternal}
            slug={isString(href) ? href : href[locale]}
            title={t(`component.tree.${name}`)}
          />
        ))}
      </List>
    )
  }),
)

type RecursiveListItemProps = { isNested?: boolean } & ComponentCategoryGroup

const RecursiveListItem: FC<RecursiveListItemProps> = memo(
  ({ icon, isExpanded, isNested, items = [], slug, title }) => {
    const [isOpen, { toggle, on }] = useBoolean(isExpanded)

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
            isComponent,
            isNested,
            isOpen,
            isSelected,
            slug,
            title,
            withToggleButton: hasItems,
            onToggle: toggle,
          }}
        />

        {hasItems ? (
          <Collapse isOpen={isOpen} unmountOnExit>
            <List borderLeftWidth="1px" gap="sm" ml="3" mt="sm" pl="3">
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

type ListItemLinkProps = {
  isComponent?: boolean
  isExternal?: boolean
  isOpen?: boolean
  isSelected?: boolean
  withToggleButton?: boolean
  onToggle?: () => void
} & Pick<RecursiveListItemProps, "icon" | "isNested" | "slug" | "title">

const ListItemLink: FC<ListItemLinkProps> = memo(
  ({
    icon,
    isComponent,
    isExternal,
    isNested,
    isOpen,
    isSelected,
    slug,
    title,
    withToggleButton,
    onToggle,
  }) => {
    isExternal ??= isComponent

    return (
      <HStack
        data-selected={dataAttr(isSelected)}
        color={isNested ? "muted" : undefined}
        cursor="pointer"
        gap="0"
        position="relative"
        rounded="md"
        transitionDuration="normal"
        transitionProperty="colors"
        userSelect="none"
        w="full"
        _active={{
          bg: !isSelected ? ["blackAlpha.500", "whiteAlpha.500"] : undefined,
        }}
        _before={{
          bg: "white",
          bottom: 0,
          content: "''",
          left: 0,
          opacity: 0.8,
          position: "absolute",
          right: 0,
          top: 0,
        }}
        _dark={{
          _before: {
            bg: "black",
            opacity: 0.86,
          },
        }}
        _hover={{
          bg: !isSelected ? [`blackAlpha.400`, "whiteAlpha.400"] : undefined,
          color: ["black", "white"],
        }}
        _selected={{
          bg: [`primary.300`, `primary.300`],
          color: [`black`, "white"],
        }}
      >
        <Text
          as={Link}
          href={slug}
          target={isExternal ? "_blank" : undefined}
          alignItems="center"
          display="inline-flex"
          flex="1"
          pl="3"
          position="static"
          pr={!withToggleButton ? "3" : undefined}
          py="sm"
          rel={isExternal ? "noopener" : undefined}
          rounded="md"
          zIndex="yamcha"
          _focus={{ outline: "none" }}
          _focusVisible={{ boxShadow: "inline" }}
          onClick={!isOpen ? onToggle : undefined}
        >
          <ListItemIcon color="muted" icon={icon} me="sm" />

          <Text as="span" flex="1" lineClamp={1}>
            {title}
          </Text>

          {isComponent ? <ExternalLinkIcon fontSize="1.25em" /> : null}
        </Text>

        {withToggleButton ? (
          <Center
            as="button"
            aria-label="Toggle children"
            boxSizing="content-box"
            fontSize="1.5em"
            p="sm"
            position="static"
            rounded="md"
            zIndex="yamcha"
            _focus={{ outline: "none" }}
            _focusVisible={{ boxShadow: "inline" }}
            onClick={onToggle}
          >
            <ChevronIcon
              transform={isOpen ? undefined : "rotate(-90deg)"}
              transitionDuration="slow"
              transitionProperty="transform"
            />
          </Center>
        ) : null}
      </HStack>
    )
  },
)

ListItemLink.displayName = "ListItemLink"

type ListItemIconProps = { icon?: null | string } & IconProps

const ListItemIcon: FC<ListItemIconProps> = memo(({ icon, ...rest }) => {
  switch (icon) {
    case "compass":
      return <CompassIcon fontSize="2xl" {...rest} />

    case "panels-top-left":
      return <PanelsTopLeftIcon fontSize="2xl" {...rest} />

    case "text-cursor-input":
      return <TextCursorInputIcon fontSize="2xl" {...rest} />

    case "layout-template":
      return <LayoutTemplateIcon fontSize="2xl" {...rest} />

    case "chart-line":
      return <ChartLineIcon fontSize="2xl" {...rest} />

    case "table":
      return <TableIcon fontSize="2xl" {...rest} />

    case "layers":
      return <LayersIcon fontSize="2xl" {...rest} />

    case "navigation":
      return <NavigationIcon fontSize="2xl" {...rest} />

    case "text":
      return <TextIcon fontSize="2xl" {...rest} />

    case "tags":
      return <TagsIcon fontSize="2xl" {...rest} />

    case "git-pull-request-arrow":
      return <GitPullRequestArrowIcon fontSize="2xl" {...rest} />

    case "yamada-ui":
      return <YamadaUI boxSize="1.5rem" {...rest} />

    case "paintbrush":
      return <PaintbrushIcon fontSize="2xl" {...rest} />

    default:
      return undefined
  }
})

ListItemIcon.displayName = "ListItemIcon"
