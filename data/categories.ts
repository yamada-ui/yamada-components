import { readFileSync } from "fs"
import path from "path"
import { convertCase, getDirNames } from "data/components"
import type { CategoriesGroup } from "data/types"
// import images from './images';

const contentsDir = path.join(process.cwd(), "contents")
export const ALL_CATEGORIES = getDirNames(contentsDir).map((category) => ({
  slug: category,
  name: category.charAt(0).toUpperCase() + category.slice(1),
}))

// TODO: nameもディレクトリ構造に反映するか
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
      slug: convertCase(`${category}/${componentName}`),
      attributes: metadata,
      code: code,
    }
  })

  const results = await Promise.all(promises)

  // NOTE: このfilterはなんや？（undefinedのやつとか入ってくる？）
  return results.filter((c) => c)
}
