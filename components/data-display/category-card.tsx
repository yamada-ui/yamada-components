import {
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Image,
  Text,
  Card,
  Divider,
  Spacer,
  Tag,
  Center,
} from "@yamada-ui/react"
import Link from "next/link"
import type { FC } from "react"
import type { Category } from "types"

type CardProps = {
  category: Category
}

export const CategoryCard: FC<CardProps> = ({ category }) => {
  return (
    <Card
      as={Link}
      href={`/${category.slug}`}
      w={300}
      variant="outline"
      _nativeHover={{
        boxShadow: [
          "0 4px 8px 0 rgba(0,0,0,0.2)",
          "0 6px 20px 0 rgba(0,0,0,0.3)",
        ],
        transition: "box-shadow 0.2s ease-in-out",
      }}
    >
      <CardHeader h={200} overflow="hidden" p={0} roundedTop="md">
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
      <Divider w="95%" mx="auto" />
      <CardFooter roundedBottom="md" pt="md">
        <Text>Description</Text>
        <Spacer />
        <Divider orientation="vertical" h="75%" />
        <Tag p={0} as={Center}>
          {category.count}
        </Tag>
      </CardFooter>
    </Card>
  )
}
