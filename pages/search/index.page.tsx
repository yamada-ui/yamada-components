import type { Component } from "component"
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPageWithConfig,
} from "next"
import type { ParsedUrlQuery } from "querystring"
import type { Locale } from "utils/i18n"
import { isArray, isEmpty } from "@yamada-ui/react"
import { Components } from "components/data-display"
import { AppProvider } from "contexts/app-context"
import { AppLayout } from "layouts/app-layout"
import { getComponent, getComponentCategoryGroup } from "utils/component"
import { getContents, getUI } from "utils/i18n"

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const getResolvedQuery = (query: ParsedUrlQuery, url?: string) => {
  if (url && !Object.keys(query).length)
    query = Object.fromEntries(new URL(url).searchParams.entries())

  return Object.entries(query).reduce<{ [key: string]: string[] | undefined }>(
    (prev, [key, values]) => {
      prev[key] = isArray(values) ? values : (values?.split(",") ?? [])

      return prev
    },
    {},
  )
}

export const getServerSideProps = async ({
  locale,
  query,
  req,
}: GetServerSidePropsContext) => {
  const componentTree = await getComponentCategoryGroup()(locale as Locale)

  const contents = getContents(locale as Locale)
  const { labels } = getResolvedQuery(query, req.headers.referer)

  if (!labels) return { notFound: true }

  const hits = contents.filter((content) => {
    if (content.type !== "component") return false

    return labels.some((label) => content.labels.includes(label))
  })

  const components = (
    await Promise.all(
      hits.map(async ({ slug }) => getComponent(slug)(locale as Locale)),
    )
  ).filter(Boolean) as Component[]

  if (isEmpty(components)) return { notFound: true }

  const ui = getUI(locale as Locale)

  return {
    props: {
      components,
      componentTree,
      description: ui.app.description,
      labels,
      title: `${labels.join(", ")} ${ui.component.components.title}`,
    },
  }
}

const Page: NextPageWithConfig<PageProps> = ({
  components,
  componentTree,
  description,
  labels,
  title,
}) => {
  return (
    <AppProvider {...{ components, componentTree }}>
      <AppLayout {...{ description, title }} gap="md">
        <Components labels={labels} />
      </AppLayout>
    </AppProvider>
  )
}

export default Page
