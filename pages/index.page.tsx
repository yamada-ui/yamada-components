import { Container, Grid, Heading, VStack } from "@yamada-ui/react"
import type { InferGetStaticPropsType, NextPage } from "next"
import { CategoryCard } from "components/layouts/category-card"
import { useI18n } from "contexts/i18n-context"
import { CATEGORIES } from "data/categories"
import type { CategoriesGroup } from "data/types"
import { AppLayout } from "layouts/app-layout"

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const list: CategoriesGroup[] = CATEGORIES
  const data = {
    list,
  }
  return {
    props: {
      data,
    },
  }
}

const Page: NextPage<PageProps> = ({ data }) => {
  const { t } = useI18n()

  return (
    <AppLayout title={t("app.title")} description={t("app.description")}>
      <Container>
        {data.list.map((group, i) => (
          <VStack key={`${group.name}-${i}`}>
            <Heading>{group.name}</Heading>
            <Grid
              templateColumns={{ base: "repeat(4, 1fr)", lg: "repeat(3, 1fr)" }}
              gap="10"
            >
              {group.categories.map((category, j) => (
                <CategoryCard
                  key={`${category.name}-${j}`}
                  category={category}
                  count={14}
                />
              ))}
            </Grid>
          </VStack>
        ))}
      </Container>
    </AppLayout>
  )
}

export default Page
