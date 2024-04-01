import type {
  GetServerSidePropsContext,
  GetStaticPathsContext,
  GetStaticPropsContext,
} from "next"
import { getComponent, getComponentsByCategory, getPaths } from "./component"

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

export const getStaticDocumentProps =
  (documentTypeName: string) =>
  async ({ params }: GetStaticPropsContext) => {
    // params.slugの総数が1の時は一覧表示、2の時はコンポーネント詳細
    if ((params.slug as string[]).length > 1) {
      const componentDir = (params.slug as string[]).join("/").toLowerCase()

      const data = await getComponent(documentTypeName, componentDir)

      return {
        props: {
          data,
        },
      }
    } else {
      // params.slugの0番目のデータのカテゴリ内のコンポーネント一覧を取得
      console.log(params.slug[0])
      const categoryDir = (params.slug as string[])[0].toLowerCase()
      const data = await getComponentsByCategory(documentTypeName, categoryDir)

      return {
        props: {
          data,
          categoryDir,
        },
      }
    }
  }
