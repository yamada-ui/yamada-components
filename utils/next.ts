import { readFileSync } from "fs"
import path from "path"
import type {
  GetServerSidePropsContext,
  GetStaticPathsContext,
  GetStaticPropsContext,
} from "next"
import { getPaths } from "./component"

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
    const component = (params.slug as string[]).join("/")

    const filePath = path.join(
      process.cwd(),
      "contents",
      documentTypeName,
      component.toLowerCase(),
      "index.tsx",
    )

    const fileContent = readFileSync(filePath, "utf8")
    const index = fileContent
      .split("\n")
      .findIndex((v) => /export\s+const\s+metadata\s*=\s*{/.test(v))

    const data = {
      path:
        documentTypeName + "/" + component.toLocaleLowerCase() + "/index.tsx",
      component: fileContent
        .split("\n")
        .slice(0, index)
        .filter((line) => !line.includes("export"))
        .join("\n"),
    }

    return {
      props: {
        data,
      },
    }
  }
