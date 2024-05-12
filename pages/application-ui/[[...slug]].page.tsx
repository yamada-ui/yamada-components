import type { InferGetStaticPropsType, NextPageWithOptions } from "next"
import { Category, CategoryGroup } from "components/data-display"
import { AppProvider } from "contexts/app-context"
import { ComponentProvider } from "contexts/component-context"
import { AppLayout } from "layouts/app-layout"
import { ComponentLayout } from "layouts/component-layout"
import { getStaticComponentPaths, getStaticComponentProps } from "utils/next"

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticPaths = getStaticComponentPaths("application-ui")

export const getStaticProps = getStaticComponentProps("application-ui")

const Page: NextPageWithOptions<PageProps> = ({
  categoryGroup,
  category,
  component,
  componentTree,
}) => {
  if (component) {
    const { metadata } = component

    return (
      <ComponentProvider {...component}>
        <ComponentLayout
          title={metadata?.title}
          description={metadata?.description}
        />
      </ComponentProvider>
    )
  }

  return (
    <AppProvider {...{ componentTree, categoryGroup, category }}>
      <AppLayout
        title={category?.title ?? categoryGroup.title}
        description={category?.description ?? categoryGroup.description}
        gap="md"
      >
        {category ? <Category /> : <CategoryGroup />}
      </AppLayout>
    </AppProvider>
  )
}

export default Page

Page.config = (asPath) => {
  const paths = asPath.replace(/^\//, "").split("/")

  if (paths.length < 3) return

  return {
    loading: {
      screen: {
        initialState: true,
      },
    },
  }
}
