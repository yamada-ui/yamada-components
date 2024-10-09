import type { InferGetStaticPropsType, NextPage } from "next"
import { Grid, Heading, HStack, Text, VStack } from "@yamada-ui/react"
import { Authors, CategoryCard } from "components/data-display"
import { AppProvider } from "contexts/app-context"
import { useI18n } from "contexts/i18n-context"
import { AppLayout } from "layouts/app-layout"
import Link from "next/link"
import { getStaticCommonProps } from "utils/next"

export const getStaticProps = getStaticCommonProps

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const Page: NextPage<PageProps> = ({ componentTree }) => {
  const { t } = useI18n()

  return (
    <AppProvider {...{ componentTree }}>
      <AppLayout
        description={t("app.description")}
        gap="lg"
        title={t("app.title")}
      >
        {componentTree.map(({ name, authors, items, slug, title }) => (
          <VStack key={name} as="section">
            <HStack as="header" gap={{ base: "md", sm: "sm" }}>
              <HStack
                alignItems={{ base: "end", sm: "stretch" }}
                flex="1"
                flexDirection={{ base: "row", sm: "column" }}
                gap={{ base: "md", sm: "0" }}
              >
                <Link href={slug}>
                  <Heading
                    as="h2"
                    size="lg"
                    fontWeight="semibold"
                    lineClamp={1}
                    lineHeight="shorter"
                  >
                    {title}
                  </Heading>
                </Link>

                <Text color="muted" whiteSpace="nowrap">
                  {t("component.category-group.count", items?.length ?? 0)}
                </Text>
              </HStack>

              <Authors authors={authors} />
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
              {items?.map(({ name, items, slug, title }) => (
                <CategoryCard key={name} {...{ items, slug, title }} />
              ))}
            </Grid>
          </VStack>
        ))}
      </AppLayout>
    </AppProvider>
  )
}

export default Page
