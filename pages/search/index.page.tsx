import type { InferGetServerSidePropsType, NextPageWithConfig } from "next"
import { SearchLabelsResult } from "components/data-display/search-labels-result"
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
        searchResult: components,
      }}
    >
      <AppLayout title={title} description={description}>
        <SearchLabelsResult />
      </AppLayout>
    </AppProvider>
  )
}

export default Page
