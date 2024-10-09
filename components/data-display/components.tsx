import type { FC } from "react"
import {
  ChevronIcon,
  Heading,
  HStack,
  Tag,
  Text,
  VStack,
} from "@yamada-ui/react"
import { NextLink } from "components/navigation"
import { useApp } from "contexts/app-context"
import { useI18n } from "contexts/i18n-context"
import { memo } from "react"
import { ComponentCard } from "./component-card"

export interface ComponentsProps {
  labels: string[]
}

export const Components: FC<ComponentsProps> = memo(({ labels }) => {
  const { components } = useApp()
  const { t } = useI18n()

  return (
    <>
      <NextLink href="/" alignSelf="start">
        <ChevronIcon fontSize="1.25em" me="xs" transform="rotate(90deg)" />
        {t("component.components.back-to")}
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
            alignItems="center"
            display="inline-flex"
            fontWeight="semibold"
            gap="sm"
            lineClamp={1}
            lineHeight="shorter"
          >
            {labels.map((label, index) => (
              <Tag
                key={index}
                colorScheme="primary"
                size="lg"
                variant="outline"
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
