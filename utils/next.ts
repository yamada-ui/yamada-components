import type { GetServerSidePropsContext, GetStaticPathsContext } from "next"
import { getPaths } from "./contentlayer"

export const getServerSideCommonProps = async ({
  req,
}: GetServerSidePropsContext) => {
  const cookies = req.headers.cookie ?? ""

  return { props: { cookies } }
}

export const getStaticDocumentPaths =
  (documentTypeName: string) =>
  async ({}: GetStaticPathsContext) => {
    const paths = getPaths(documentTypeName)

    return { paths, fallback: false }
  }
