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
import type { Locale } from "./i18n"
import type {
  Component,
  ComponentCategory,
  ComponentCategoryGroup,
} from "component"
import { CONSTANT } from "constant"

const getErrorLabels = (componentTree: ComponentCategoryGroup[]) => {
  const errorLabels: { label: string; path: string }[] = []
  componentTree.forEach((tree) => {
    tree.labels?.forEach((label) => {
      if (!CONSTANT.LABEL.includes(label)) {
        errorLabels.push({
          label: label,
          path: tree.slug,
        })
      }
    })
    if (tree?.items) {
      errorLabels.push(...getErrorLabels(tree.items))
    }
  })
  return errorLabels
}

const checkErrorLabels = (componentTree: ComponentCategoryGroup[]) => {
  const errorLabels = getErrorLabels(componentTree)

  if (errorLabels.length > 0) {
    console.log(errorLabels)
    const msg = `
    these labels is not exist label.ts
    ${errorLabels
      .map(
        (child) => `
        path: ${child.path}
        label: ${child.label}
      `,
      )
      .join("\n")}
    please remove these labels in metadata.json or add these labels in label.ts
    `
    throw Error(msg)
  }
}

export const getServerSideCommonProps = async ({
  req,
}: GetServerSidePropsContext) => {
  const cookies = req.headers.cookie ?? ""

  return { props: { cookies } }
}

export const getStaticCommonProps = async ({
  locale,
}: GetStaticPropsContext) => {
  const componentTree = await getComponentCategoryGroup()(locale as Locale)

  checkErrorLabels(componentTree)

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

    const componentTree = await getComponentCategoryGroup()(
      locale as Locale,
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
      const _category = categoryGroup?.items?.find(
        ({ name }) => name === paths.at(-1),
      )

      const items: Component[] = (
        await Promise.all(
          _category?.items?.map(({ slug }) =>
            getComponent(slug)(locale as Locale),
          ) ?? [],
        )
      ).filter(Boolean) as Component[]

      const category: ComponentCategory = {
        ..._category,
        items,
      } as ComponentCategory

      const props = { categoryGroup, category, componentTree }

      return { props, notFound: !category }
    } else {
      const slug = [categoryGroupName, ...paths].join("/")

      const component = await getComponent(slug)(locale as Locale)

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
