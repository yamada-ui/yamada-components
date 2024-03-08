import { readFileSync } from "fs"
import path from "path"
import type { ParsedUrlQuery } from "querystring"
import { Container } from "@yamada-ui/react"
import type { GetStaticProps, GetStaticPaths, NextPage } from "next"
import React from "react"
import { ComponentPreview } from "components/component-preview"
import { useI18n } from "contexts/i18n-context"
import { getAllComponents } from "data/components"
import { AppLayout } from "layouts/app-layout"

type PageProps = {
  data: {
    path: string
    component: string
  }
}

type PageParams = ParsedUrlQuery & {
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
