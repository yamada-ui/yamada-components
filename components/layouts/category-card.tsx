import {
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Image,
  Text,
  Card,
} from "@yamada-ui/react"
import Link from "next/link"
import type { FC } from "react"
import type { Category } from "data/types"

type CardProps = {
  count: number
  category: Category
}

export const CategoryCard: FC<CardProps> = ({ category, count }) => {
  return (
    <Card as={Link} href={`/category/${category.slug}`}>
      <CardHeader style={{ overflow: "hidden" }}>
        {/* TODO: fix src */}
        <Image
          size="full"
          src="https://picsum.photos/400"
          alt={category.name}
        />
      </CardHeader>
      <CardBody>
        <Heading size="md">{category.name}</Heading>
      </CardBody>
      <CardFooter>
        <Text>
          {count} {count === 1 ? "component" : "components"}
        </Text>
      </CardFooter>
    </Card>
  )
}
