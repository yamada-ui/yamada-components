import type {
  GetServerSidePropsContext,
  GetStaticPathsContext,
  GetStaticPropsContext,
} from "next"
import { toArray } from "./array"
import type { Component } from "./component"
import { getComponentTree, getComponentPaths, getComponent } from "./component"
import type { ComponentTree } from "component"

export const getServerSideCommonProps = async ({
  req,
}: GetServerSidePropsContext) => {
  const cookies = req.headers.cookie ?? ""

  return { props: { cookies } }
}

export const getStaticCommonProps = async ({
  locale,
}: GetStaticPropsContext) => {
  const componentTree = await getComponentTree()(locale)

  return { props: { componentTree } }
}

export const getStaticComponentProps =
  (categoryGroupName: string) =>
  async ({
    params,
    locale,
  }: GetStaticPropsContext): Promise<{
    props: {
      categoryGroup?: ComponentTree
      category?: ComponentTree
      component?: Component
      componentTree: ComponentTree[]
    }
    notFound?: boolean
  }> => {
    const paths = toArray(params?.slug ?? [])

    const componentTree = await getComponentTree()(locale)

    const categoryGroup = componentTree.find(
      ({ name }) => name === categoryGroupName,
    )

    if (!paths.length) {
      const props = { categoryGroup, componentTree }

      return { props, notFound: !categoryGroup }
    }

    if (paths.length === 1) {
      const category = categoryGroup.items?.find(
        ({ name }) => name === paths.at(-1),
      )

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
