import type { FC } from "react"
import { ChevronIcon, Grid, Heading, HStack, Text } from "@yamada-ui/react"
import { NextLink } from "components/navigation"
import { useApp } from "contexts/app-context"
import { useI18n } from "contexts/i18n-context"
import { memo } from "react"
import { Authors } from "./authors"
import { CategoryCard } from "./category-card"

export interface CategoryGroupProps {}

export const CategoryGroup: FC<CategoryGroupProps> = memo(() => {
  const { categoryGroup } = useApp()
  const { t } = useI18n()

  return (
    <>
      <NextLink href="/" alignSelf="start">
        <ChevronIcon fontSize="1.25em" me="xs" transform="rotate(90deg)" />
        {t("component.category-group.back-to")}
      </NextLink>

      <HStack as="header" gap={{ base: "md", sm: "sm" }}>
        <HStack
          alignItems={{ base: "end", sm: "stretch" }}
          flex="1"
          flexDirection={{ base: "row", sm: "column" }}
          gap={{ base: "md", sm: "0" }}
        >
          <Heading
            as="h2"
            size="lg"
            fontWeight="semibold"
            lineClamp={1}
            lineHeight="shorter"
          >
            {categoryGroup?.title}
          </Heading>

          <Text color="muted" whiteSpace="nowrap">
            {t(
              "component.category-group.count",
              categoryGroup?.items?.length ?? 0,
            )}
          </Text>
        </HStack>

        <Authors authors={categoryGroup?.authors} />
      </HStack>

      <Grid
        as="nav"
        gap="md"
        templateColumns={{
          base: "repeat(4, 1fr)",
          sm: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
      >
        {categoryGroup?.items?.map(({ name, items, slug, title }) => (
          <CategoryCard key={name} {...{ items, slug, title }} />
        ))}
      </Grid>
    </>
  )
})

CategoryGroup.displayName = "CategoryGroup"
