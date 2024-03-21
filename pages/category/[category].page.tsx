import type { ParsedUrlQuery } from "querystring"
import {
  Container,
  Heading,
  Link,
  List,
  ListItem,
  Text,
} from "@yamada-ui/react"
import type { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { ComponentPreview } from "components/component-preview"
import { useI18n } from "contexts/i18n-context"
import { CATEGORIES_SLUGS, getCategoryData } from "data/categories"
import type { ComponentInfo } from "data/components"
import { getAllComponents, getComponentsByCategory } from "data/components"
import type { Category } from "data/types"
import { AppLayout } from "layouts/app-layout"

type PageProps = {
  data: {
    category: Category | undefined
    components: ComponentInfo[]
    allComponents: ComponentInfo[]
  }
}

type PageParams = ParsedUrlQuery & {
  category: string
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: CATEGORIES_SLUGS.map((slug) => ({ params: { category: slug } })),
  fallback: false,
})

export const getStaticProps: GetStaticProps<PageProps, PageParams> = async (
  context,
) => {
  const components = await getComponentsByCategory()
  const data: PageProps["data"] = {
    category: getCategoryData(context!.params!.category),
    components:
      context!.params!.category in components
        ? components[context!.params!.category]
        : [],
    allComponents: await getAllComponents(),
  }
  return {
    props: { data },
  }
}

const Page: NextPage<PageProps> = ({ data }) => {
  const { t } = useI18n()

  return (
    <AppLayout
      title={t("categories.title")}
      description={t("categories.description")}
    >
      <Container>
        <Heading>カテゴリー：{data.category!.name}</Heading>
        <List>
          {data.components.map((e, i) => (
            <ListItem
              key={`${e.component}-${i}`}
              display="flex"
              flexDir="column"
            >
              <Text>{e.component}</Text>
              <Link
                href={`/component/${e.slug}`}
              >{`/component/${e.slug}`}</Link>
              <ComponentPreview path={e.component} code={e.code} />
            </ListItem>
          ))}
        </List>
      </Container>
    </AppLayout>
  )
}

export default Page
