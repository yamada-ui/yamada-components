import { existsSync } from "fs"
import { readFile, readdir, writeFile } from "fs/promises"
import * as p from "@clack/prompts"
import c from "chalk"
import { program } from "commander"
import type { ComponentMetadata } from "component"
import { getResolvedPath } from "utils/path"

type Content = {
  title: string
  type: "component" | "category" | "category-group" | "label"
  description?: string
  slug: string
  labels?: string[]
  hierarchy: {
    "category-group": string
    category?: string
    component?: string
  }
}

const getRecursivePaths = async (path: string): Promise<string[]> => {
  try {
    const dirents = await readdir(path, { withFileTypes: true })

    return (
      await Promise.all(
        dirents.flatMap(async (dirent) => {
          const resolvedPath = `${path}/${dirent.name}`

          if (dirent.isDirectory()) {
            return await getRecursivePaths(resolvedPath)
          } else {
            return resolvedPath
          }
        }),
      )
    )
      .flat()
      .filter((path) => path.split(/[\\/]/).pop() === "metadata.json")
  } catch {
    const isExist = existsSync(path)

    return isExist ? [path] : []
  }
}

const getPaths: p.RequiredRunner =
  (path: string = getResolvedPath("contents")) =>
  async (_, s): Promise<string[]> => {
    s.start(`Getting the Yamada Components paths`)

    const paths = await getRecursivePaths(path)

    s.stop(`Got the Yamada Components paths`)

    return paths
  }

const getType = (path: string): Content["type"] | undefined => {
  const layers = path
    .replace(new RegExp(`^${getResolvedPath("contents")}`), "")
    .split(/[\\/]/)
    .filter((v) => v !== "metadata.json")
    .filter(Boolean)
  switch (layers.length) {
    case 1:
      return "category-group"
    case 2:
      return "category"
    case 3:
      return "component"
    default:
      return undefined
  }
}

const getSlug = (path: string) => {
  path = path.replace(new RegExp(`^${getResolvedPath("contents")}`), "")
  path = path.replace("metadata.json", "")
  return path
}

const getHierarchy = (path: string) => {
  const layers = path
    .replace(new RegExp(`^${getResolvedPath("contents")}`), "")
    .split(/[\\/]/)
    .filter((v) => v !== "metadata.json")
    .filter(Boolean)
  const hierarchy: Content["hierarchy"] = {
    "category-group": layers[0],
  }
  if (layers.length >= 2) {
    hierarchy.category = layers[1]
  }
  if (layers.length >= 3) {
    hierarchy.component = layers[2]
  }
  return hierarchy
}

const generateSearchContent: p.RequiredRunner =
  (paths: string[], lang: "en" | "ja") => async (p, s) => {
    s.start(`Generating table of contents and writing files`)

    const contents = await Promise.all(
      paths.map(async (path) => {
        const metadataContent = await readFile(path, "utf8")
        const metadataJson: ComponentMetadata = JSON.parse(metadataContent)

        const content: Content = {
          title: metadataJson[lang]
            ? metadataJson[lang].title
            : metadataJson["en"].title,
          description: metadataJson[lang]
            ? metadataJson[lang].description
            : metadataJson["en"].description,
          type: getType(path),
          slug: getSlug(path),
          labels: [], // labelsがまだ
          hierarchy: getHierarchy(path),
        }
        return content
      }),
    )

    const data = JSON.stringify(contents)

    const outPath = `i18n/content.${lang}.json`

    await writeFile(outPath, data)

    s.stop(`Wrote files`)
    p.note(outPath, "Generated search contents")
  }

program.action(async () => {
  p.intro(c.magenta(`Generating Yamada Components search content`))
  const s = p.spinner()

  try {
    const start = process.hrtime.bigint()

    const paths = await getPaths()(p, s)

    await generateSearchContent(paths, "en")(p, s)
    await generateSearchContent(paths, "ja")(p, s)

    const end = process.hrtime.bigint()
    const duration = (Number(end - start) / 1e9).toFixed(2)

    p.outro(c.green(`Done in ${duration}s\n`))
  } catch (e) {
    s.stop(`An error occurred`, 500)

    p.cancel(c.red(e instanceof Error ? e.message : "Message is missing"))
  }
})

program.parse()
