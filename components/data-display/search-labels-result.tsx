import { ChevronIcon, HStack, Tag, Text, VStack } from "@yamada-ui/react"
import type { FC } from "react"
import { memo } from "react"
import { ComponentCard } from "./component-card"
import { NextLink } from "components/navigation"
import { useApp } from "contexts/app-context"
import { useI18n } from "contexts/i18n-context"

export type SearchLabelsResultProps = {}

export const SearchLabelsResult: FC = memo(() => {
  const { searchResult } = useApp()
  const { t } = useI18n()

  return (
    <>
      <NextLink alignSelf="start" href="/">
        <ChevronIcon transform="rotate(90deg)" fontSize="1.25em" me="xs" />
        {t("component.category-group.back-to")}
      </NextLink>

      <HStack as="header" gap={{ base: "md", sm: "sm" }}>
        <HStack
          flex="1"
          flexDirection={{ base: "row", sm: "column" }}
          alignItems={{ base: "end", sm: "stretch" }}
          justifyContent="space-between"
          gap={{ base: "md", sm: "0" }}
          paddingBlock="md"
        >
          <HStack>
            {searchResult.labels.map((v) => (
              <Tag key={v}>{v}</Tag>
            ))}
          </HStack>

          <Text color="muted" whiteSpace="nowrap">
            {t("component.category.count", searchResult.contents?.length ?? 0)}
          </Text>
        </HStack>

        {/* <Authors authors={category.authors} /> */}
      </HStack>

      <VStack as="nav" gap="lg">
        {searchResult.contents?.map(({ name, ...rest }) => (
          <ComponentCard key={name} {...{ name, ...rest }} />
        ))}
      </VStack>
    </>
  )
})

SearchLabelsResult.displayName = "SearchResult"
