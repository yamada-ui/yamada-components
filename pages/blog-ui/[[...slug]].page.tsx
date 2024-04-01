import {
  Container,
  Heading,
  Link as UILink,
  List,
  ListItem,
  isArray,
  Text,
} from "@yamada-ui/react"
import type { InferGetStaticPropsType, NextPage } from "next"
import Link from "next/link"
import { ComponentPreview } from "components/layouts"
import { useI18n } from "contexts/i18n-context"
import { AppLayout } from "layouts/app-layout"
import { getStaticDocumentPaths, getStaticDocumentProps } from "utils/next"

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticPaths = getStaticDocumentPaths("blog-ui")

export const getStaticProps = getStaticDocumentProps("blog-ui")

const Page: NextPage<PageProps> = ({ data, categoryDir }) => {
  const { t } = useI18n()
  return (
    <AppLayout
      title={t("components.title")}
      description={t("components.description")}
    >
      {isArray(data) ? (
        <Container>
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
        </Container>
      ) : (
        <ComponentPreview path={data.path} code={data.component} />
      )}
    </AppLayout>
  )
}

export default Page
