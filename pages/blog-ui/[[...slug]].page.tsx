import { readFileSync } from "fs"
import path from "path"
import { Container } from "@yamada-ui/react"
import type { InferGetStaticPropsType, NextPage } from "next"
import { ComponentPreview } from "components/layouts"
import { useI18n } from "contexts/i18n-context"
import { AppLayout } from "layouts/app-layout"
import { getStaticDocumentPaths } from "utils/next"

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticPaths = getStaticDocumentPaths("blog-ui")

export const getStaticProps = async ({
  params,
}: {
  params: {
    slug: string[]
  }
}) => {
  const component = params.slug.join("/")

  const filePath = path.join(
    process.cwd(),
    "contents",
    "blog-ui",
    component.toLowerCase(),
    "index.tsx",
  )

  const fileContent = readFileSync(filePath, "utf8")
  const index = fileContent
    .split("\n")
    .findIndex((v) => /export\s+const\s+metadata\s*=\s*{/.test(v))

  const data = {
    path: component.split("/")[1],
    component: fileContent
      .split("\n")
      .slice(0, index)
      .filter((line) => !line.includes("export"))
      .join("\n"),
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
