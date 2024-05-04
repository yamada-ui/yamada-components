import { Link as UILink, List, ListItem, Text, Heading } from "@yamada-ui/react"
import Link from "next/link"
import type { ComponentProps, FC } from "react"
import type { DividedComponent } from "components/layouts"
import { DetailComponent } from "components/layouts"
import { useI18n } from "contexts/i18n-context"
import type { ComponentMetadata } from "types"

type CategoriesDisplayProps = {
  data: {
    path: string
    component: ComponentProps<typeof DividedComponent>["component"]
    metadata: ComponentMetadata
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
            <Text>{e.metadata.title}</Text>
            <Text>{e.metadata.description}</Text>
            <DetailComponent
              path={e.path}
              component={e.component}
              metadata={e.metadata}
              isDisableBackBtn
            />
          </ListItem>
        ))}
      </List>
    </>
  )
}
