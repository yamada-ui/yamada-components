import type { FC } from "react"
import { ChevronIcon, Heading, HStack, Text, VStack } from "@yamada-ui/react"
import { NextLink } from "components/navigation"
import { useApp } from "contexts/app-context"
import { useI18n } from "contexts/i18n-context"
import { memo } from "react"
import { Authors } from "./authors"
import { ComponentCard } from "./component-card"

export interface CategoryProps {}

export const Category: FC<CategoryProps> = memo(() => {
  const { category, categoryGroup } = useApp()
  const { t } = useI18n()

  return (
    <>
      <NextLink href={categoryGroup?.slug} alignSelf="start">
        <ChevronIcon fontSize="1.25em" me="xs" transform="rotate(90deg)" />
        {t("component.category.back-to")}
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
            {category?.title}
          </Heading>

          <Text color="muted" whiteSpace="nowrap">
            {t("component.category.count", category?.items?.length ?? 0)}
          </Text>
        </HStack>

        <Authors authors={category?.authors} />
      </HStack>

      <VStack as="nav" gap="lg">
        {category?.items?.map(({ name, ...rest }) => (
          <ComponentCard key={name} {...{ name, ...rest }} />
        ))}
      </VStack>
    </>
  )
})

Category.displayName = "Category"
