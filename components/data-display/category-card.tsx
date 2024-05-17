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
import type { ComponentCategoryGroup } from "component"
import { useI18n } from "contexts/i18n-context"

export type CategoryCardProps = LinkBoxProps &
  Pick<ComponentCategoryGroup, "title" | "items" | "slug"> & {
    headingProps?: TextProps
  }

export const CategoryCard = memo(
  forwardRef<CategoryCardProps, "article">(
    ({ title, slug, items, headingProps, ...rest }, ref) => {
      const { tc } = useI18n()
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
              {tc("component.category.count", (str) => (
                <Text as="span" key={str}>
                  {str === "count" ? items?.length ?? 0 : str}
                </Text>
              ))}
            </Text>
          </VStack>

          <LinkOverlay as={Link} href={slug} />
        </LinkBox>
      )
    },
  ),
)

CategoryCard.displayName = "CategoryCard"
