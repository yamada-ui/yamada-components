import type { GetStaticProps, NextPage } from "next"
import { useI18n } from "contexts/i18n-context"
import { AppLayout } from "layouts/app-layout"
import {
  Container,
  Heading,
  Link,
  List,
  ListItem,
  Text,
  VStack,
} from "@yamada-ui/react"
import { CategoriesGroup } from "data/types"
import { CATEGORIES } from "data/categories"

// type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>
type PageProps = {
  data: {
    list: CategoriesGroup[]
  }
}

const Page: NextPage<PageProps> = ({ data }) => {
  const { t } = useI18n()

  return (
    <AppLayout title={t("app.title")} description={t("app.description")}>
      <Container>
        {data.list.map((group, i) => (
          <VStack key={`${group.name}-${i}`}>
            <Heading>{group.name}</Heading>
            <List>
              {group.categories.map((category, j) => (
                <ListItem
                  key={`${category.name}-${j}`}
                  display="flex"
                  flexDir={"column"}
                >
                  <Text>{category.name}</Text>
                  <Link
                    href={`/category/${category.slug}`}
                  >{`/category/${category.slug}`}</Link>
                </ListItem>
              ))}
            </List>
          </VStack>
        ))}
      </Container>
    </AppLayout>
  )
}

export default Page

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const list: CategoriesGroup[] = CATEGORIES
  const data: PageProps["data"] = {
    list,
  }
  return {
    props: {
      data,
    },
  } as { props: PageProps }
}

// export const getServerSideProps = getServerSideCommonProps
