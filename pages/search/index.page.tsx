import type { ParsedUrlQuery } from "querystring"
import { isArray, isEmpty } from "@yamada-ui/react"
import type {
  InferGetServerSidePropsType,
  NextPageWithConfig,
  GetServerSidePropsContext,
} from "next"
import type { Component } from "component"
import { Components } from "components/data-display"
import { AppProvider } from "contexts/app-context"
import { AppLayout } from "layouts/app-layout"
import { getComponent, getComponentCategoryGroup } from "utils/component"
import { getContents, getUI, type Locale } from "utils/i18n"

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const getResolvedQuery = (query: ParsedUrlQuery, url?: string) => {
  if (url && !Object.keys(query).length)
    query = Object.fromEntries(new URL(url).searchParams.entries())

  return Object.entries(query).reduce(
    (prev, [key, values]) => {
      prev[key] = isArray(values) ? values : (values?.split(",") ?? [])

      return prev
    },
    {} as Record<string, string[] | undefined>,
  )
}

export const getServerSideProps = async ({
  req,
  locale,
  query,
}: GetServerSidePropsContext) => {
  const componentTree = await getComponentCategoryGroup()(locale as Locale)

  const contents = getContents(locale as Locale)
  const { labels } = getResolvedQuery(query, req.headers.referer)

  if (!labels) return { notFound: true }

  const hits = contents.filter((content) => {
    if (content.type !== "component") return false

    return labels?.some((label) => content.labels.includes(label))
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
      title: `${labels.join(", ")} ${ui.component.components.title}`,
      description: ui.app.description,
      componentTree,
      components,
      labels,
    },
  }
}

const Page: NextPageWithConfig<PageProps> = ({
  title,
  description,
  componentTree,
  components,
  labels,
}) => {
  return (
    <AppProvider {...{ componentTree, components }}>
      <AppLayout {...{ title, description }} gap="md">
        <Components labels={labels} />
      </AppLayout>
    </AppProvider>
  )
}

export default Page
