import {
  forwardRef,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
} from "@yamada-ui/react"
import type { LinkBoxProps, TextProps } from "@yamada-ui/react"
import Link from "next/link"
import { memo } from "react"
import type { ComponentTree } from "component"

export type CategoryCardProps = LinkBoxProps &
  Pick<ComponentTree, "title" | "items" | "slug"> & {
    headingProps?: TextProps
  }

export const CategoryCard = memo(
  forwardRef<CategoryCardProps, "article">(
    ({ title, slug, items, headingProps, ...rest }, ref) => {
      return (
        <LinkBox
          ref={ref}
          as="article"
          borderWidth="1px"
          rounded="md"
          p="md"
          {...rest}
        >
          <VStack gap="xs">
            <Text as="h3" fontSize="lg" {...headingProps}>
              {title}
            </Text>

            <Text color="muted" fontSize="sm">
              {items.length} components
            </Text>
          </VStack>

          <LinkOverlay as={Link} href={slug} />
        </LinkBox>
      )
    },
  ),
)

CategoryCard.displayName = "CategoryCard"
