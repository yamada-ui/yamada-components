import { readFileSync } from "fs"
import path from "path"
import { Container } from "@yamada-ui/react"
import type { NextPage } from "next"
import React from "react"
import { ComponentPreview } from "components/layouts"
import { useI18n } from "contexts/i18n-context"
import { getPaths } from "data/components"
import { AppLayout } from "layouts/app-layout"

type PageProps = {
  data: {
    path: string
    component: string
  }
}

export const getStaticPaths = async () => {
  return {
    paths: getPaths(),
    fallback: false,
  }
}

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
  } as { props: PageProps }
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
