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

    const componentTree = await getComponentCategoryGroup()(locale)

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

      const items: Component[] | undefined = await Promise.all(
        _category.items?.map(({ slug }) => getComponent(slug)(locale)),
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
