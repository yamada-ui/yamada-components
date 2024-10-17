import type { InferGetStaticPropsType, NextPageWithConfig } from "next"
import { Category, CategoryGroup } from "components/data-display"
import { AppProvider } from "contexts/app-context"
import { ComponentProvider } from "contexts/component-context"
import { AppLayout } from "layouts/app-layout"
import { ComponentLayout } from "layouts/component-layout"
import { getStaticComponentPaths, getStaticComponentProps } from "utils/next"
import { getComponentConfig } from "utils/ui"

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticPaths = getStaticComponentPaths("page-sections")

export const getStaticProps = getStaticComponentProps("page-sections")

const Page: NextPageWithConfig<PageProps> = ({
  category,
  categoryGroup,
  component,
  componentTree,
}) => {
  if (component) {
    const { metadata } = component

    return (
      <AppProvider {...{ componentTree }}>
        <ComponentProvider {...component}>
          <ComponentLayout
            description={metadata?.description}
            title={metadata?.title}
          />
        </ComponentProvider>
      </AppProvider>
    )
  }

  return (
    <AppProvider {...{ category, categoryGroup, componentTree }}>
      <AppLayout
        description={category?.description ?? categoryGroup?.description}
        gap="md"
        title={category?.title ?? categoryGroup?.title}
      >
        {category ? <Category /> : <CategoryGroup />}
      </AppLayout>
    </AppProvider>
  )
}

export default Page

Page.config = getComponentConfig
