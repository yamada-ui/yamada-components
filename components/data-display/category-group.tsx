import { ChevronIcon, Grid, Heading, HStack, Text } from "@yamada-ui/react"
import type { FC } from "react"
import { memo } from "react"
import { CategoryCard } from "./category-card"
import { NextLink } from "components/navigation"
import { useApp } from "contexts/app-context"
import { useI18n } from "contexts/i18n-context"

export type CategoryGroupProps = {}

export const CategoryGroup: FC = memo(() => {
  const { categoryGroup } = useApp()
  const { t } = useI18n()

  return (
    <>
      <NextLink alignSelf="start" href="/">
        <ChevronIcon transform="rotate(90deg)" fontSize="1.25em" me="xs" />
        {t("component.category-group.back-to")}
      </NextLink>

      <HStack as="header" alignItems="end">
        <Heading as="h2" size="lg" fontWeight="semibold" lineHeight="shorter">
          {categoryGroup.title}
        </Heading>

        <Text color="muted">{categoryGroup.items?.length ?? 0} categories</Text>
      </HStack>

      <Grid as="nav" templateColumns={{ base: "repeat(4, 1fr)" }} gap="md">
        {categoryGroup.items?.map(({ name, title, slug, items }) => (
          <CategoryCard key={name} {...{ title, slug, items }} />
        ))}
      </Grid>
    </>
  )
})

CategoryGroup.displayName = "CategoryGroup"
