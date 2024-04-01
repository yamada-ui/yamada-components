import path from "path"
import type { CategoriesGroup } from "types"
import { getDirNames } from "utils/component"
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
