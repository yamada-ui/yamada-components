import { ChevronIcon, Heading, HStack, Text, VStack } from "@yamada-ui/react"
import type { FC } from "react"
import { memo } from "react"
import { ComponentCard } from "./component-card"
import { NextLink } from "components/navigation"
import { useApp } from "contexts/app-context"
import { useI18n } from "contexts/i18n-context"

export type CategoryProps = {}

export const Category: FC = memo(() => {
  const { categoryGroup, category } = useApp()
  const { t } = useI18n()

  return (
    <>
      <NextLink alignSelf="start" href={categoryGroup.slug}>
        <ChevronIcon transform="rotate(90deg)" fontSize="1.25em" me="xs" />
        {t("component.category.back-to")}
      </NextLink>

      <HStack as="header" alignItems="end">
        <Heading as="h2" size="lg" fontWeight="semibold" lineHeight="shorter">
          {category.title}
        </Heading>

        <Text color="muted">{category.items?.length ?? 0} categories</Text>
      </HStack>

      <VStack as="nav" gap="lg">
        {category.items?.map(({ name, title, slug }) => (
          <ComponentCard key={name} {...{ title, slug }} />
        ))}
      </VStack>
    </>
  )
})

Category.displayName = "Category"
