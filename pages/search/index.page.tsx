import type { InferGetServerSidePropsType, NextPageWithConfig } from "next"
import { Category } from "components/data-display"
import { AppProvider } from "contexts/app-context"
import { AppLayout } from "layouts/app-layout"
import { getServerSideSearchProps } from "utils/next"

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

export const getServerSideProps = getServerSideSearchProps

const Page: NextPageWithConfig<PageProps> = ({
  title,
  description,
  componentTree,
  components,
}) => {
  return (
    <AppProvider
      {...{
        componentTree,
        categoryGroup: {
          name: "",
          slug: "/",
          title,
          isExpanded: true,
          items: components,
        },
        category: { name: "", slug: "", title, items: components },
      }}
    >
      <AppLayout title={title} description={description}>
        <Category />
      </AppLayout>
    </AppProvider>
  )
}

export default Page
