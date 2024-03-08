import {
  Container,
  Heading,
  Link as UILink,
  List,
  ListItem,
  Text,
  VStack,
} from "@yamada-ui/react"
import type { InferGetStaticPropsType, NextPage } from "next"
import Link from "next/link"
import { useI18n } from "contexts/i18n-context"
import { CATEGORIES } from "data/categories"
import type { CategoriesGroup } from "data/types"
import { AppLayout } from "layouts/app-layout"

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const list: CategoriesGroup[] = CATEGORIES
  const data = {
    list,
  }
  return {
    props: {
      data,
    },
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
                  flexDir="column"
                >
                  <Text>{category.name}</Text>
                  <UILink
                    as={Link}
                    href={`/category/${category.slug}`}
                  >{`/category/${category.slug}`}</UILink>
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
