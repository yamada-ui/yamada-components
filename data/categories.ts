import { readFileSync } from "fs"
import path from "path"
import type { CategoriesGroup } from "types"
import { toKebabCase } from "utils/assetion"
import { getDirNames } from "utils/contentlayer"
// import images from './images';

const contentsDir = path.join(process.cwd(), "contents")
export const ALL_CATEGORIES = getDirNames(contentsDir).map((category) => ({
  slug: category,
  name: category.charAt(0).toUpperCase() + category.slice(1),
}))

export const CATEGORIES: CategoriesGroup[] = [
  {
    name: "Application UI",
    categories: ALL_CATEGORIES,
  },
]

export const CATEGORIES_SLUGS = ALL_CATEGORIES.map((item) => item.slug)

export const getCategoryData = (category: string) =>
  ALL_CATEGORIES.find((item) => item.slug === category)

export const getComponentsByCategory = async (category: string) => {
  const root = path.join(contentsDir, category)
  const components = getDirNames(root)
  const promises = components.map(async (componentName: string) => {
    const { metadata } = await import(
      `../contents/${category}/${componentName}/index`
    )

    const filePath = path.join(root, componentName, "index.tsx")

    const fileContent = readFileSync(filePath, "utf8")
    const index = fileContent
      .split("\n")
      .findIndex((v) => /export\s+const\s+metadata\s*=\s*{/.test(v))
    const code = fileContent
      .split("\n")
      .slice(0, index)
      .filter((line) => !line.includes("export"))
      .join("\n")

    return {
      component: `${category}/${componentName}`,
      slug: toKebabCase(`${category}/${componentName}`),
      attributes: metadata,
      code: code,
    }
  })

  return await Promise.all(promises)
}
