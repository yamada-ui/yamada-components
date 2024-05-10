import { existsSync } from "fs"
import { readdir, readFile } from "fs/promises"
import path from "path"
import { toKebabCase } from "@yamada-ui/react"
import type { ComponentTree, SharedMetadata } from "component"
import { CONSTANT } from "constant"

export const getComponentTree =
  (
    targetPath: string = "contents",
    callback?: (metadata: SharedMetadata) => void,
  ) =>
  async (locale: string): Promise<ComponentTree[]> => {
    const defaultLocale = CONSTANT.I18N.DEFAULT_LOCALE
    const dirents = await readdir(targetPath, { withFileTypes: true })

    const componentTree = await Promise.all(
      dirents.map(async (dirent) => {
        const name = toKebabCase(dirent.name)
        const slug = path.join(dirent.path, name)

        if (!dirent.isDirectory()) {
          if (name === "metadata.json") {
            try {
              const data = await readFile(slug, "utf-8")
              const json = JSON.parse(data)
              const metadata = (json[locale] ??
                json[defaultLocale]) as SharedMetadata

              callback?.(metadata)
            } catch {}
          }

          return
        }

        let metadata: SharedMetadata | undefined = undefined

        const items = await getComponentTree(
          slug,
          (data) => (metadata = data),
        )(locale)

        return {
          name,
          slug: slug.replace(/^contents\//, "/"),
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
    const categoryGroupPath = path.join("contents", categoryGroupName)
    const componentTree =
      await getComponentTree(categoryGroupPath)(defaultLocale)

    const getPaths = (componentTree?: ComponentTree[]) => (locale: string) =>
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

const getMetadata = (dirPath: string) => async (locale: string) => {
  const defaultLocale = CONSTANT.I18N.DEFAULT_LOCALE

  try {
    const data = await readFile(path.join(dirPath, "metadata.json"), "utf-8")
    const json = JSON.parse(data)
    const metadata = (json[locale] ?? json[defaultLocale]) as SharedMetadata

    return metadata
  } catch {
    return {} as SharedMetadata
  }
}

export const getComponent = (slug: string) => async (locale: string) => {
  try {
    const dirPath = path.join("contents", slug)
    const componentPath = path.join(dirPath, "index.tsx")
    const themePath = path.join(dirPath, "theme.ts")
    const configPath = path.join(dirPath, "config.ts")
    const validComponentPath = path.join(slug, "index.tsx")
    const validThemePath = path.join(slug, "theme.ts")
    const validConfigPath = path.join(slug, "config.ts")

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
        const filePath = path.join(dirPath, name)
        const code = await readFile(filePath, "utf-8")

        return { name, path: filePath, code }
      }),
    )

    const data = {
      slug: "/" + slug,
      paths,
      components,
      metadata,
    }

    return data
  } catch {}
}

export type Component = Awaited<ReturnType<ReturnType<typeof getComponent>>>

export type ComponentPaths = Component["paths"]
