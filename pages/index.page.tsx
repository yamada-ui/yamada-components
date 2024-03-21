import { Container, Heading, VStack, Wrap } from "@yamada-ui/react"
import type { GetStaticProps, NextPage } from "next"
import { CategoryCard } from "components/layouts/category-card"
import { useI18n } from "contexts/i18n-context"
import { CATEGORIES } from "data/categories"
import type { CategoriesGroup } from "data/types"
import { AppLayout } from "layouts/app-layout"

// type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>
type PageProps = {
  data: {
    list: CategoriesGroup[]
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
            <Wrap gap={9}>
              {group.categories.map((category, j) => (
                <CategoryCard
                  key={`${category.name}-${j}`}
                  category={category}
                  count={14}
                />
              ))}
            </Wrap>
          </VStack>
        ))}
      </Container>
    </AppLayout>
  )
}

export default Page

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const list: CategoriesGroup[] = CATEGORIES
  const data: PageProps["data"] = {
    list,
  }
  return {
    props: {
      data,
    },
  } as { props: PageProps }
}

// export const getServerSideProps = getServerSideCommonProps
