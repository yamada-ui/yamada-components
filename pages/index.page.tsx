import path from "path"
import { Container, VStack, toKebabCase } from "@yamada-ui/react"
import type { InferGetStaticPropsType, NextPage } from "next"
import { CategoriesGroupDisplay } from "components/data-display/categories-group-display"
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
            <CategoriesGroupDisplay
              {...{
                documentTypeName: group.name,
                categories: group.categories,
              }}
            />
          </VStack>
        ))}
      </Container>
    </AppLayout>
  )
}

export default Page
