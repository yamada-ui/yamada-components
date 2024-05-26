import { Grid, Heading, HStack, Text, VStack } from "@yamada-ui/react"
import type { InferGetStaticPropsType, NextPage } from "next"
import Link from "next/link"
import { CategoryCard } from "components/data-display"
import { AppProvider } from "contexts/app-context"
import { useI18n } from "contexts/i18n-context"
import { AppLayout } from "layouts/app-layout"
import { getStaticCommonProps } from "utils/next"

export const getStaticProps = getStaticCommonProps

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const Page: NextPage<PageProps> = ({ componentTree }) => {
  const { t } = useI18n()

  return (
    <AppProvider {...{ componentTree }}>
      <AppLayout
        title={t("app.title")}
        description={t("app.description")}
        gap="lg"
      >
        {componentTree.map(({ title, name, slug, items }) => (
          <VStack key={name} as="section">
            <HStack
              as="header"
              flexDirection={{ base: "row", sm: "column" }}
              alignItems={{ base: "end", sm: "stretch" }}
              gap={{ base: "md", sm: "0" }}
            >
              <Link href={slug}>
                <Heading
                  as="h2"
                  size="lg"
                  fontWeight="semibold"
                  lineHeight="shorter"
                  lineClamp={1}
                >
                  {title}
                </Heading>
              </Link>

              <Text color="muted" whiteSpace="nowrap">
                {t("component.category-group.count", items?.length ?? 0)}
              </Text>
            </HStack>

            <Grid
              as="nav"
              templateColumns={{
                base: "repeat(4, 1fr)",
                lg: "repeat(3, 1fr)",
                md: "repeat(2, 1fr)",
                sm: "repeat(1, 1fr)",
              }}
              gap="md"
            >
              {items?.map(({ name, title, slug, items }) => (
                <CategoryCard key={name} {...{ title, slug, items }} />
              ))}
            </Grid>
          </VStack>
        ))}
      </AppLayout>
    </AppProvider>
  )
}

export default Page
