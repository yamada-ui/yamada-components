import { Container, isArray } from "@yamada-ui/react"
import type { InferGetStaticPropsType, NextPage } from "next"
import { CategoriesDisplay } from "components/data-display/categories-display"
import { CategoriesGroupDisplay } from "components/data-display/categories-group-display"
import { ComponentPreview } from "components/layouts"
import { useI18n } from "contexts/i18n-context"
import { AppLayout } from "layouts/app-layout"
import { ComponentLayout } from "layouts/component-layout"
import { getStaticDocumentPaths, getStaticDocumentProps } from "utils/next"

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticPaths = getStaticDocumentPaths("page-sections")

export const getStaticProps = getStaticDocumentProps("page-sections")

const Page: NextPage<PageProps> = ({ data, categoryDir, categories, type }) => {
  const { t } = useI18n()

  if (type === "component" && !isArray(data)) {
    return (
      <ComponentLayout
        title={t("components.title")}
        description={t("components.description")}
      >
        <ComponentPreview path={data.path} code={data.component[0].code} />
      </ComponentLayout>
    )
  }

  return (
    <AppLayout
      title={t("components.title")}
      description={t("components.description")}
    >
      <Container>
        {type === "category" && isArray(data) ? (
          <CategoriesDisplay
            {...{ categoryDir }}
            data={data.map((item) => ({
              path: item.path,
              slug: item.path,
              metadata: item.metadata,
              component: item.component[0].code,
            }))}
          />
        ) : (
          <CategoriesGroupDisplay
            documentTypeName="Page Sections"
            {...{ categories }}
          />
        )}
      </Container>
    </AppLayout>
  )
}

export default Page
