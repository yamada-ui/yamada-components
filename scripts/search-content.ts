import { readFile, writeFile } from "fs/promises"
import path from "path"
import * as p from "@clack/prompts"
import c from "chalk"
import { program } from "commander"
import { glob } from "glob"
import { prettier } from "./utils"
import type { ContentType, OriginMetadata } from "component"
import { CONSTANT } from "constant"
import type { Locale } from "utils/i18n"

const DEFAULT_LOCALE = CONSTANT.I18N.DEFAULT_LOCALE
const LOCALES = CONSTANT.I18N.LOCALES.map(({ value }) => value)

type ContentHierarchy = {
  categoryGroup: string
  category?: string
  component?: string
}

type Content = {
  title: string
  description?: string
  type: ContentType
  slug: string
  labels: string[]
  hierarchy: ContentHierarchy
}

const getMetadataPaths: p.RequiredRunner = () => async (_, s) => {
  s.start(`Getting the Yamada UI content paths`)

  const metadataPaths = await glob("contents/**/metadata.json")

  s.stop(`Got the Yamada UI content paths`)

  return metadataPaths
}

const getType = (slug: string): ContentType => {
  const hierarchy = slug.split("/").length - 1

  switch (hierarchy) {
    case 1:
      return "categoryGroup"

    case 2:
      return "category"

    default:
      return "component"
  }
}

const getSlug = (path: string) =>
  `/${path
    .replace(/\\/g, "/")
    .replace(/^contents\//, "")
    .replace(/\/metadata.json$/, "")}`

const getMetadata = async (metadataPath: string) => {
  const data = await readFile(metadataPath, "utf-8")
  const metadata: OriginMetadata = JSON.parse(data)

  return metadata
}

const generateSearchContent = async (
  metadataPaths: string[],
  locale: Locale,
) => {
  const contents = await Promise.all(
    metadataPaths.map(async (metadataPath) => {
      const metadata = await getMetadata(metadataPath)

      const title = metadata[locale]?.title ?? metadata[DEFAULT_LOCALE]?.title
      const description =
        metadata[locale]?.description ?? metadata[DEFAULT_LOCALE]?.description
      const labels = metadata.labels ?? []
      const slug = getSlug(metadataPath)
      const type = getType(slug)
      const [, categoryGroup, category, component] = slug.split("/")

      let hierarchy = { categoryGroup, category, component }

      hierarchy[type] = title

      if (type === "category" || type === "component") {
        const metadata = await getMetadata(
          path.join("contents", categoryGroup, "metadata.json"),
        )

        const title = metadata[locale]?.title ?? metadata[DEFAULT_LOCALE]?.title

        hierarchy.categoryGroup = title
      }

      if (type === "component") {
        const metadata = await getMetadata(
          path.join("contents", categoryGroup, category, "metadata.json"),
        )

        const title = metadata[locale]?.title ?? metadata[DEFAULT_LOCALE]?.title

        hierarchy.category = title
      }

      const content: Content = {
        title,
        description,
        type,
        slug,
        labels,
        hierarchy,
      }
      return content
    }),
  )

  const data = await prettier(JSON.stringify(contents), {
    parser: "json",
  })

  const outPath = `i18n/content.${locale}.json`

  await writeFile(outPath, data)
}

program.action(async () => {
  p.intro(c.magenta(`Generating Yamada Components search content`))

  const s = p.spinner()

  try {
    const start = process.hrtime.bigint()

    const metadataPaths = await getMetadataPaths()(p, s)

    s.start(`Generating table of contents and writing files`)

    await Promise.all(
      LOCALES.map((locale) => generateSearchContent(metadataPaths, locale)),
    )

    s.stop(`Wrote files`)

    const end = process.hrtime.bigint()
    const duration = (Number(end - start) / 1e9).toFixed(2)

    p.outro(c.green(`Done in ${duration}s\n`))
  } catch (e) {
    s.stop(`An error occurred`, 500)

    p.cancel(c.red(e instanceof Error ? e.message : "Message is missing"))
  }
})

program.parse()
