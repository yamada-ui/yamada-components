import { Heading, Wrap } from "@yamada-ui/react"
import type { FC } from "react"
import { CategoryCard } from "./category-card"

type CategoriesGroupDisplayProps = {
  categories: {
    name: string
    slug: string
  }[]
  documentTypeName: string
}

export const CategoriesGroupDisplay: FC<CategoriesGroupDisplayProps> = ({
  categories,
  documentTypeName,
}) => {
  return (
    <>
      <Heading>{documentTypeName}</Heading>
      <Wrap gap={9}>
        {categories.map((category, j) => (
          <CategoryCard
            key={`${category.name}-${j}`}
            category={category}
            count={14}
          />
        ))}
      </Wrap>
    </>
  )
}
