import type {
  Component,
  ComponentCategory,
  ComponentCategoryGroup,
} from "component"
import type {
  GetServerSidePropsContext,
  GetStaticPathsContext,
  GetStaticPropsContext,
} from "next"
import type { Locale } from "./i18n"
import { toArray } from "./array"
import {
  checkInvalidLabels,
  getComponent,
  getComponentCategoryGroup,
  getComponentPaths,
} from "./component"

export const getServerSideCommonProps = ({
  req,
}: GetServerSidePropsContext) => {
  const cookies = req.headers.cookie ?? ""

  return { props: { cookies } }
}

export const getStaticCommonProps = async ({
  locale,
}: GetStaticPropsContext) => {
  const componentTree = (await getComponentCategoryGroup()(locale as Locale))
    .map((component) => ({
      ...component,
      items: component.items?.filter(({ items }) => items),
    }))
    .filter(({ items }) => items && items.length > 0)

  return { props: { componentTree } }
}

export const getStaticComponentProps =
  (categoryGroupName: string) =>
  async ({
    locale,
    params,
  }: GetStaticPropsContext): Promise<{
    props: {
      componentTree: ComponentCategoryGroup[]
      category?: ComponentCategory
      categoryGroup?: ComponentCategoryGroup
      component?: Component
    }
    notFound?: boolean
  }> => {
    const paths = toArray(params?.slug ?? [])

    const componentTree = await getComponentCategoryGroup()(
      locale as Locale,
      `/${[categoryGroupName, ...paths].join("/")}`,
    )

    for (const component of componentTree) {
      if (component.items) {
        component.items = component.items.filter(({ items }) => items)
      }
    }

    const categoryGroup = componentTree.find(
      ({ name }) => name === categoryGroupName,
    )

    if (!paths.length) {
      const props = { categoryGroup, componentTree }

      return { notFound: !categoryGroup, props }
    }

    if (paths.length === 1) {
      const _category = categoryGroup?.items?.find(
        ({ name }) => name === paths.at(-1),
      )

      const items: Component[] = (
        await Promise.all(
          _category?.items?.map(async ({ slug }) => {
            const component = await getComponent(slug)(locale as Locale)

            if (component) checkInvalidLabels(component)

            return component
          }) ?? [],
        )
      ).filter(Boolean) as Component[]

      const category: ComponentCategory = {
        ..._category,
        items,
      } as ComponentCategory

      const props = { category, categoryGroup, componentTree }

      return { notFound: !category, props }
    } else {
      const slug = [categoryGroupName, ...paths].join("/")

      const component = await getComponent(slug)(locale as Locale)

      if (component) checkInvalidLabels(component)

      const props = { component, componentTree }

      return { notFound: !component, props }
    }
  }

export const getStaticComponentPaths =
  (categoryGroupName: string) =>
  async ({ locales }: GetStaticPathsContext) => {
    const paths = await getComponentPaths(categoryGroupName)(locales)

    return { fallback: false, paths }
  }
