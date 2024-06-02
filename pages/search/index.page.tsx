import type { InferGetServerSidePropsType, NextPageWithConfig } from "next"
import { getServerSideSearchProps } from "utils/next"

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

export const getServerSideProps = getServerSideSearchProps

const Page: NextPageWithConfig<PageProps> = ({ result }) => {
  return <>{JSON.stringify(result)}</>
}

export default Page
