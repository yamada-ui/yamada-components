import { Link as UILink, List, ListItem, Text, Heading } from "@yamada-ui/react"
import Link from "next/link"
import type { FC } from "react"
import { ComponentPreview } from "components/layouts"

type CategoriesDisplayProps = {
  data: {
    path: string
    component: string
    metadata: any
    slug: string
  }[]
  categoryDir: string
}

export const CategoriesDisplay: FC<CategoriesDisplayProps> = ({
  categoryDir,
  data,
}) => {
  return (
    <>
      <Heading>カテゴリー：{categoryDir}</Heading>
      <List>
        {data.map((e, i) => (
          <ListItem key={`${e.slug}-${i}`} display="flex" flexDir="column">
            <Text>{e.slug}</Text>
            <UILink as={Link} href={`/${e.slug}`}>{`/${e.slug}`}</UILink>
            <ComponentPreview path={e.path} code={e.component} />
          </ListItem>
        ))}
      </List>
    </>
  )
}
