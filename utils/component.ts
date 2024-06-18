import { existsSync } from "fs"
import { readdir, readFile } from "fs/promises"
import path from "node:path"
import { toKebabCase } from "@yamada-ui/react"
import type { GetStaticPathsResult } from "next"
import type { Locale } from "./i18n"
import type {
  CommonMetadata,
  Component,
  ComponentCategoryGroup,
  Metadata,
  OriginMetadata,
} from "component"
import { CONSTANT } from "constant"

export const getComponentCategoryGroup =
  (targetPath: string = "contents", callback?: (metadata: Metadata) => void) =>
  async (
    locale: Locale = CONSTANT.I18N.DEFAULT_LOCALE,
    currentSlug?: string,
  ): Promise<ComponentCategoryGroup[]> => {
    const defaultLocale = CONSTANT.I18N.DEFAULT_LOCALE
    const dirents = await readdir(targetPath, { withFileTypes: true })

    const componentTree = await Promise.all(
      dirents.map(async (dirent) => {
        const name = toKebabCase(dirent.name)
        const targetPath = path.join(dirent.path, name)

        if (!dirent.isDirectory()) {
          if (name === "metadata.json") {
            try {
              const data = await readFile(targetPath, "utf-8")
              const json: OriginMetadata = JSON.parse(data)
              const metadata: CommonMetadata =
                json[locale] ?? json[defaultLocale]
              const icon = json.icon ?? null
              const authors = json.authors ?? null
              const labels = json.labels ?? null

              // labelのチェック
              labels?.forEach((label) => {
                if (CONSTANT.LABEL.includes(label)) {
                  console.log(`${label} is correct`)
                } else {
                  console.log(`${label} is incorrect`)
                }
              })

              callback?.({ ...metadata, icon, authors, labels })
            } catch {}
          }

          return
        }

        let metadata: Metadata | undefined = undefined

        const items = await getComponentCategoryGroup(
          targetPath,
          (data) => (metadata = data),
        )(locale, currentSlug)

        const slug = targetPath.replace(/\\/g, "/").replace(/^contents\//, "/")
        const isExpanded =
          slug === currentSlug ||
          items.some(
            ({ slug, items }) =>
              slug === currentSlug ||
              items?.some(({ slug }) => slug === currentSlug),
          )

        return {
          name,
          slug,
          isExpanded,
          ...(items.length ? { items } : {}),
          ...metadata!,
        }
      }),
    )

    return componentTree.filter(Boolean) as ComponentCategoryGroup[]
  }

export const getComponentPaths =
  (categoryGroupName: string) =>
  async (locales: string[] = []) => {
    const defaultLocale = CONSTANT.I18N.DEFAULT_LOCALE
    const categoryGroupPath = path.join("contents", categoryGroupName)

    const componentTree =
      await getComponentCategoryGroup(categoryGroupPath)(defaultLocale)

    const getPaths =
      (componentTree?: ComponentCategoryGroup[]) =>
      (locale: string): GetStaticPathsResult["paths"] =>
        (componentTree ?? []).flatMap(({ slug, items }) => {
          slug = slug.replace(new RegExp(`^/${categoryGroupName}/`), "")

          const resolvedSlug = slug.split("/")

          return [
            { params: { slug: resolvedSlug }, locale },
            ...getPaths(items)(locale),
          ]
        })

    const paths = locales.flatMap((locale) => [
      { params: { slug: [] }, locale },
      ...getPaths(componentTree)(locale),
    ])

    return paths
  }

const omitComponentFiles = (fileNames: string[]) =>
  fileNames.filter((fileName) => !["metadata.json"].includes(fileName))

const getMetadata = (dirPath: string) => async (locale: Locale) => {
  const defaultLocale = CONSTANT.I18N.DEFAULT_LOCALE

  try {
    const data = await readFile(path.join(dirPath, "metadata.json"), "utf-8")
    const json: OriginMetadata = JSON.parse(data)
    const metadata: CommonMetadata = json[locale] ?? json[defaultLocale]
    const options = json.options ?? null
    const authors = json.authors ?? null
    const labels = json.labels ?? null

    return { ...metadata, options, authors, labels }
  } catch {
    return null
  }
}

export const getComponent =
  (slug: string) =>
  async (
    locale: Locale = CONSTANT.I18N.DEFAULT_LOCALE,
  ): Promise<Component | undefined> => {
    try {
      slug = slug.replace(/^\//, "")
      const name = slug.split("/").at(-1)!
      const dirPath = path.join("contents", slug)
      const componentPath = path.join(dirPath, "index.tsx")
      const themePath = path.join(dirPath, "theme.ts")
      const configPath = path.join(dirPath, "config.ts")
      const validComponentPath = path
        .join(slug, "index.tsx")
        .replace(/\\/g, "/")
      const validThemePath = path.join(slug, "theme.ts")
      const validConfigPath = path.join(slug, "config.ts")

      if (!existsSync(componentPath)) return undefined

      let fileNames = await readdir(dirPath)

      const metadata = await getMetadata(dirPath)(locale)
      const hasTheme = existsSync(themePath)
      const hasConfig = existsSync(configPath)

      fileNames = omitComponentFiles(fileNames)

      const paths = {
        component: validComponentPath,
        theme: hasTheme ? validThemePath : null,
        config: hasConfig ? validConfigPath : null,
      }

      const components = await Promise.all(
        fileNames.map(async (name) => {
          const filePath = path.join(dirPath, name)
          const code = await readFile(filePath, "utf-8")

          return { name, path: filePath, code }
        }),
      )

      slug = `/${slug}`

      const data: Component = {
        name,
        slug,
        paths,
        components,
        metadata,
      }

      return data
    } catch {}
  }
