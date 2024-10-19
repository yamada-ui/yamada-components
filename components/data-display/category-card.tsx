import type { LinkBoxProps, TextProps } from "@yamada-ui/react"
import type { ComponentCategoryGroup } from "component"
import {
  forwardRef,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
} from "@yamada-ui/react"
import { useI18n } from "contexts/i18n-context"
import Link from "next/link"
import { memo } from "react"

export type CategoryCardProps = {
  headingProps?: TextProps
} & LinkBoxProps &
  Pick<ComponentCategoryGroup, "items" | "slug" | "title">

export const CategoryCard = memo(
  forwardRef<CategoryCardProps, "article">(
    ({ items, slug, title, headingProps, ...rest }, ref) => {
      const { t } = useI18n()

      return (
        <LinkBox
          ref={ref}
          as="article"
          borderWidth="1px"
          p="md"
          rounded="md"
          {...rest}
        >
          <VStack gap="xs">
            <Text as="h3" fontSize="lg" {...headingProps}>
              {title}
            </Text>

            <Text color="muted" fontSize="sm">
              {t("component.category.count", items?.length ?? 0)}
            </Text>
          </VStack>

          <LinkOverlay as={Link} href={slug} />
        </LinkBox>
      )
    },
  ),
)

CategoryCard.displayName = "CategoryCard"
