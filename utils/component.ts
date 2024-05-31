import { existsSync } from "fs"
import { readdir, readFile } from "fs/promises"
import { toKebabCase } from "@yamada-ui/react"
import { joinPath } from "./path"
import type {
  CommonMetadata,
  ComponentCategoryGroup,
  Metadata,
  OriginMetadata,
} from "component"
import { CONSTANT } from "constant"

export const getComponentCategoryGroup =
  (targetPath: string = "contents", callback?: (metadata: Metadata) => void) =>
  async (
    locale: string,
    currentSlug?: string,
  ): Promise<ComponentCategoryGroup[]> => {
    const defaultLocale = CONSTANT.I18N.DEFAULT_LOCALE
    const dirents = await readdir(targetPath, { withFileTypes: true })

    const componentTree = await Promise.all(
      dirents.map(async (dirent) => {
        const name = toKebabCase(dirent.name)
        const targetPath = joinPath(dirent.path, name)

        if (!dirent.isDirectory()) {
          if (name === "metadata.json") {
            try {
              const data = await readFile(targetPath, "utf-8")
              const json: OriginMetadata = JSON.parse(data)
              const metadata: CommonMetadata =
                json[locale] ?? json[defaultLocale]
              const icon = json.icon ?? null
              const authors = json.authors ?? null

              callback?.({ ...metadata, icon, authors })
            } catch {}
          }

          return
        }

        let metadata: Metadata | undefined = undefined

        const items = await getComponentCategoryGroup(
          targetPath,
          (data) => (metadata = data),
        )(locale, currentSlug)

        const slug = targetPath.replace(/^contents\//, "/")
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
          ...metadata,
        }
      }),
    )

    return componentTree.filter(Boolean)
  }

export const getComponentPaths =
  (categoryGroupName: string) => async (locales: string[]) => {
    const defaultLocale = CONSTANT.I18N.DEFAULT_LOCALE
    const categoryGroupPath = joinPath("contents", categoryGroupName)

    const componentTree =
      await getComponentCategoryGroup(categoryGroupPath)(defaultLocale)

    const getPaths =
      (componentTree?: ComponentCategoryGroup[]) => (locale: string) =>
        (componentTree ?? []).flatMap(({ slug, items }) => {
          slug = slug
            .replace(/\\/g, "/")
            .replace(new RegExp(`^/${categoryGroupName}/`), "")

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

const getMetadata = (dirPath: string) => async (locale: string) => {
  const defaultLocale = CONSTANT.I18N.DEFAULT_LOCALE

  try {
    const data = await readFile(joinPath(dirPath, "metadata.json"), "utf-8")
    const json: OriginMetadata = JSON.parse(data)
    const metadata: CommonMetadata = json[locale] ?? json[defaultLocale]
    const options = json.options ?? null
    const authors = json.authors ?? null

    return { ...metadata, options, authors }
  } catch {
    return null
  }
}

export const getComponent = (slug: string) => async (locale: string) => {
  try {
    slug = slug.replace(/^\//, "")
    const name = slug.split("/").at(-1)
    const dirPath = joinPath("contents", slug)
    const componentPath = joinPath(dirPath, "index.tsx")
    const themePath = joinPath(dirPath, "theme.ts")
    const configPath = joinPath(dirPath, "config.ts")
    const validComponentPath = joinPath(slug, "index.tsx")
    const validThemePath = joinPath(slug, "theme.ts")
    const validConfigPath = joinPath(slug, "config.ts")

    if (!existsSync(componentPath)) return

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
        const filePath = joinPath(dirPath, name)
        const code = await readFile(filePath, "utf-8")

        return { name, path: filePath, code }
      }),
    )

    slug = `/${slug}`

    const data = {
      name,
      slug,
      paths,
      components,
      metadata,
    }

    return data
  } catch {}
}
