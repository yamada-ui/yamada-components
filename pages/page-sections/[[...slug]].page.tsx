import { Container } from "@yamada-ui/react"
import type { InferGetStaticPropsType, NextPage } from "next"
import { ComponentPreview } from "components/layouts"
import { useI18n } from "contexts/i18n-context"
import { AppLayout } from "layouts/app-layout"
import { getStaticDocumentPaths, getStaticDocumentProps } from "utils/next"

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticPaths = getStaticDocumentPaths("page-sections")

export const getStaticProps = getStaticDocumentProps("page-sections")

const Page: NextPage<PageProps> = ({ data }) => {
  const { t } = useI18n()
  return (
    <AppLayout
      title={t("components.title")}
      description={t("components.description")}
    >
      <Container>
        <ComponentPreview path={data.path} code={data.component} />
      </Container>
    </AppLayout>
  )
}

export default Page
