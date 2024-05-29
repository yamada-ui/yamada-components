import type { InferGetStaticPropsType, NextPageWithConfig } from "next"
import { Category, CategoryGroup } from "components/data-display"
import { AppProvider } from "contexts/app-context"
import { ComponentProvider } from "contexts/component-context"
import { AppLayout } from "layouts/app-layout"
import { ComponentLayout } from "layouts/component-layout"
import { getStaticComponentPaths, getStaticComponentProps } from "utils/next"
import { getComponentConfig } from "utils/ui"

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticPaths = getStaticComponentPaths("layouts")

export const getStaticProps = getStaticComponentProps("layouts")

const Page: NextPageWithConfig<PageProps> = ({
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

Page.config = getComponentConfig
