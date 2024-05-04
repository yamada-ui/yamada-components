import type {
  GetServerSidePropsContext,
  GetStaticPathsContext,
  GetStaticPropsContext,
} from "next"
import {
  getCategoriesByDocName,
  getComponent,
  getComponentsByCategory,
  getPaths,
} from "./component"

export const getServerSideCommonProps = async ({
  req,
}: GetServerSidePropsContext) => {
  const cookies = req.headers.cookie ?? ""

  return { props: { cookies } }
}

export const getStaticDocumentPaths =
  (documentTypeName: string) =>
  async ({ locales }: GetStaticPathsContext) => {
    const paths = getPaths({ documentTypeName, locales })

    return { paths, fallback: true }
  }

export const getStaticDocumentProps =
  (documentTypeName: string) =>
  async ({ params, locale }: GetStaticPropsContext) => {
    if (!params.slug) {
      const categories = getCategoriesByDocName(documentTypeName)

      if (!categories)
        return {
          notFound: true,
        }

      return {
        props: {
          type: "categories-group",
          categories,
        },
      }
    }

    // params.slugの総数が1の時は一覧表示、2の時はコンポーネント詳細
    if ((params.slug as string[]).length > 1) {
      const componentDir = (params.slug as string[]).join("/").toLowerCase()

      const data = await getComponent(documentTypeName, componentDir, locale)

      if (!data)
        return {
          notFound: true,
        }

      return {
        props: {
          type: "component",
          data,
        },
      }
    } else {
      // params.slugの0番目のデータのカテゴリ内のコンポーネント一覧を取得
      const categoryDir = (params.slug as string[])[0].toLowerCase()
      const data = await getComponentsByCategory(
        documentTypeName,
        categoryDir,
        locale,
      )

      if (!data)
        return {
          notFound: true,
        }

      return {
        props: {
          type: "category",
          data,
          categoryDir,
        },
      }
    }
  }
