import { readFileSync } from "fs"
import { GetStaticProps, GetStaticPaths, NextPage } from "next"
import path from "path"
import { ParsedUrlQuery } from "querystring"
import React from "react"
import { Container } from "@yamada-ui/react"
import { getAllComponents } from "data/components"
import { ComponentPreview } from "components/component-preview"
import { AppLayout } from "layouts/app-layout"
import { useI18n } from "contexts/i18n-context"

interface PageProps {
  data: {
    path: string
    component: string
  }
}

interface PageParams extends ParsedUrlQuery {
  component: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: (await getAllComponents()).map((component) => ({
      params: { component: component.slug },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<PageProps, PageParams> = async ({
  params,
}) => {
  // paramsオブジェクトからslugを取得
  const component = params!.component.split("-").join("")

  // ローカル上のファイルパス取得
  const filePath = path.join(
    process.cwd(),
    "contents",
    component.toLowerCase(),
    "index.tsx",
  )

  // ファイルの読み込み
  const fileContent = readFileSync(filePath, "utf8")
  const index = fileContent
    .split("\n")
    .findIndex((v) => /export\s+const\s+metadata\s*=\s*{/.test(v))

  const data: PageProps["data"] = {
    path: component.charAt(0).toUpperCase() + component.slice(1).toLowerCase(),
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
