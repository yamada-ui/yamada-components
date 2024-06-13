import {
  ChevronIcon,
  Heading,
  HStack,
  Tag,
  Text,
  VStack,
} from "@yamada-ui/react"
import type { FC } from "react"
import { memo } from "react"
import { ComponentCard } from "./component-card"
import { NextLink } from "components/navigation"
import { useApp } from "contexts/app-context"
import { useI18n } from "contexts/i18n-context"

export type ComponentsProps = { labels: string[] }

export const Components: FC<ComponentsProps> = memo(({ labels }) => {
  const { components } = useApp()
  const { t } = useI18n()

  return (
    <>
      <NextLink alignSelf="start" href="/">
        <ChevronIcon transform="rotate(90deg)" fontSize="1.25em" me="xs" />
        {t("component.components.back-to")}
      </NextLink>

      <HStack as="header" gap={{ base: "md", sm: "sm" }}>
        <HStack
          flex="1"
          flexDirection={{ base: "row", sm: "column" }}
          alignItems={{ base: "end", sm: "stretch" }}
          gap={{ base: "md", sm: "0" }}
        >
          <Heading
            as="h2"
            size="lg"
            fontWeight="semibold"
            lineHeight="shorter"
            lineClamp={1}
            display="inline-flex"
            alignItems="center"
            gap="sm"
          >
            {labels.map((label, index) => (
              <Tag
                key={index}
                size="lg"
                variant="outline"
                colorScheme="primary"
              >
                {label}
              </Tag>
            ))}{" "}
            {t("component.components.title")}
          </Heading>

          <Text color="muted" whiteSpace="nowrap">
            {t("component.category.count", components?.length ?? 0)}
          </Text>
        </HStack>
      </HStack>

      <VStack as="nav" gap="lg">
        {components?.map(({ name, ...rest }) => (
          <ComponentCard key={name} {...{ name, ...rest }} />
        ))}
      </VStack>
    </>
  )
})

Components.displayName = "Components"
