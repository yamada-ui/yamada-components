import { Heading, Wrap } from "@yamada-ui/react"
import type { FC } from "react"
import { CategoryCard } from "./category-card"

type CategoriesGroupDisplayProps = {
  categories: {
    name: string
    slug: string
    count: number
  }[]
  documentTypeName: string
}

export const CategoriesGroupDisplay: FC<CategoriesGroupDisplayProps> = ({
  categories,
  documentTypeName,
}) => {
  if (!categories) return null

  return (
    <>
      <Heading>{documentTypeName}</Heading>
      <Wrap gap={9}>
        {categories.map((category, j) => (
          <CategoryCard key={`${category.name}-${j}`} category={category} />
        ))}
      </Wrap>
    </>
  )
}
