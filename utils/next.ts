import { readFile } from "fs/promises"
import path from "node:path"
import type {
  GetServerSidePropsContext,
  GetStaticPathsContext,
  GetStaticPropsContext,
} from "next"
import { toArray } from "./array"
import {
  getComponentCategoryGroup,
  getComponentPaths,
  getComponent,
} from "./component"
import type {
  Component,
  ComponentCategory,
  ComponentCategoryGroup,
} from "component"
import type { SearchContent } from "search-content"
// import { useI18n } from "contexts/i18n-context"

export const getServerSideCommonProps = async ({
  req,
}: GetServerSidePropsContext) => {
  const cookies = req.headers.cookie ?? ""

  return { props: { cookies } }
}

export const getStaticCommonProps = async ({
  locale,
}: GetStaticPropsContext) => {
  const componentTree = await getComponentCategoryGroup()(locale)

  return { props: { componentTree } }
}

export const getServerSideSearchProps = async ({
  locale,
  query,
}: GetServerSidePropsContext) => {
  const { labels } = query
  if (!labels)
    return {
      props: {},
    }
  const contents = await readFile(
    path.join("i18n", `content.${locale}.json`),
    "utf-8",
  )
  const json = JSON.parse(contents) as SearchContent[]
  const labelsArray = Array.isArray(labels) ? labels : [labels]
  const result = json.filter(
    (v) =>
      v.labels.some((label) => labelsArray.includes(label)) &&
      v.type === "component",
  )
  // console.log(labels, result);
  return {
    props: { result },
  }
}

export const getStaticComponentProps =
  (categoryGroupName: string) =>
  async ({
    params,
    locale,
  }: GetStaticPropsContext): Promise<{
    props: {
      categoryGroup?: ComponentCategoryGroup
      category?: ComponentCategory
      component?: Component
      componentTree: ComponentCategoryGroup[]
    }
    notFound?: boolean
  }> => {
    const paths = toArray(params?.slug ?? [])

    const componentTree = await getComponentCategoryGroup()(
      locale,
      `/${[categoryGroupName, ...paths].join("/")}`,
    )

    const categoryGroup = componentTree.find(
      ({ name }) => name === categoryGroupName,
    )

    if (!paths.length) {
      const props = { categoryGroup, componentTree }

      return { props, notFound: !categoryGroup }
    }

    if (paths.length === 1) {
      const _category = categoryGroup.items?.find(
        ({ name }) => name === paths.at(-1),
      )

      const items: Component[] = await Promise.all(
        _category.items?.map(({ slug }) => getComponent(slug)(locale)) ?? [],
      )

      const category: ComponentCategory = { ..._category, items }

      const props = { categoryGroup, category, componentTree }

      return { props, notFound: !category }
    } else {
      const slug = [categoryGroupName, ...paths].join("/")

      const component = await getComponent(slug)(locale)

      const props = { component, componentTree }

      return { props, notFound: !component }
    }
  }

export const getStaticComponentPaths =
  (categoryGroupName: string) =>
  async ({ locales }: GetStaticPathsContext) => {
    const paths = await getComponentPaths(categoryGroupName)(locales)

    return { paths, fallback: false }
  }
