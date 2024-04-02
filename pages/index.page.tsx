import path from "path"
import { Container, Heading, VStack, Wrap, toKebabCase } from "@yamada-ui/react"
import type { InferGetStaticPropsType, NextPage } from "next"
import { CategoryCard } from "components/layouts"
import { useI18n } from "contexts/i18n-context"
import { AppLayout } from "layouts/app-layout"
import { getDirNames } from "utils/component"

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  // /contents内の直下取得
  const root = path.join(process.cwd(), "contents")
  // ループ回してその配下のカテゴリー取得
  const data = getDirNames(root).map((child) => {
    const childPath = path.join(root, child)
    return {
      name: child,
      categories: getDirNames(childPath).map((i) => ({
        name: i,
        slug: toKebabCase(path.join(child, i)),
      })),
    }
  })
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
        {data.map((group, i) => (
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
