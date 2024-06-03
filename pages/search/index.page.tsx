import type { InferGetServerSidePropsType, NextPageWithConfig } from "next"
import { getServerSideSearchProps } from "utils/next"

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

export const getServerSideProps = getServerSideSearchProps

const Page: NextPageWithConfig<PageProps> = ({ components }) => {
  console.log(components)

  return <>component</>
}

export default Page
