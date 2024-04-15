import { Link as UILink, List, ListItem, Text, Heading } from "@yamada-ui/react"
import Link from "next/link"
import type { ComponentProps, FC } from "react"
import { DividedComponent } from "components/layouts/devided-component"
import { useI18n } from "contexts/i18n-context"

type CategoriesDisplayProps = {
  data: {
    path: string
    component: ComponentProps<typeof DividedComponent>["component"]
    metadata: any
    slug: string
  }[]
  categoryDir: string
}

export const CategoriesDisplay: FC<CategoriesDisplayProps> = ({
  categoryDir,
  data,
}) => {
  const { t } = useI18n()

  return (
    <>
      <Heading>
        {t("categories.heading")}
        {categoryDir}
      </Heading>
      <List>
        {data.filter(Boolean).map((e, i) => (
          <ListItem key={`${e.slug}-${i}`} display="flex" flexDir="column">
            <Text>{e.slug}</Text>
            <UILink as={Link} href={`/${e.slug}`}>{`/${e.slug}`}</UILink>
            <DividedComponent component={e.component} path={e.path} />
          </ListItem>
        ))}
      </List>
    </>
  )
}
