import { readFileSync, readdirSync } from "fs"
import path from "path"
import { toKebabCase } from "@yamada-ui/react"

export type ComponentInfo = {
  component: string
  slug: string
  code: string
  // code: { fileName: string; language: string; code: string }[];
  attributes: any
}

const convertCase = (string: string) => {
  const splitted = string
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .toLowerCase()
    .split(" ")
  return splitted.join("-")
}

// const getComponentCode = (componentFolder: string, componentName: string) => {
//   const componentContents = readdirSync(componentFolder).filter(
//     (item) =>
//       (item.endsWith(".tsx") && !item.endsWith(".story.tsx")) ||
//       item.endsWith(".ts") ||
//       item.endsWith(".css"),
//   )

//   const mainFileContent = readFileSync(
//     path.join(componentFolder, `${componentName}.tsx`),
//     "utf-8",
//   )
//   const otherFilesContent = componentContents
//     .filter((file) => file !== `${componentName}.tsx`)
//     .map((file) => ({
//       name: file,
//       content: readFileSync(path.join(componentFolder, file), "utf-8"),
//     }))

//   return [
//     {
//       fileName: `${componentName}.tsx`,
//       language: "tsx",
//       code: mainFileContent,
//     },
//     ...otherFilesContent.map(({ name, content }) => ({
//       fileName: name,
//       language: name.endsWith(".css") ? "scss" : "tsx",
//       code: content,
//     })),
//   ]
// }

export const getDirNames = (basePath: string) => {
  return readdirSync(basePath, { withFileTypes: true })
    .filter((dir) => dir.isDirectory())
    .map((dir) => dir.name)
}

export const getPaths = (documentTypeName: string) => {
  const result: { params: { slug: string[] } }[] = []
  const root = path.join(process.cwd(), "contents", documentTypeName)
  const parent = getDirNames(root)
  result.push({ params: { slug: [] } })
  for (const item of parent) {
    const parentFullPath = path.join(root, item)
    result.push({ params: { slug: [item] } })
    readdirSync(parentFullPath, { withFileTypes: true })
      .filter((dir) => dir.isDirectory())
      .forEach((r) => {
        result.push({ params: { slug: [item, r.name] } })
      })
  }

  return result
}

export const getComponent = async (
  documentTypeName: string,
  componentDir: string,
) => {
  const { metadata } = await import(
    `../contents/${documentTypeName}/${componentDir}/index`
  )
  const filePath = path.join(
    process.cwd(),
    "contents",
    documentTypeName,
    componentDir,
    "index.tsx",
  )

  const fileContent = readFileSync(filePath, "utf8")
  const index = fileContent
    .split("\n")
    .findIndex((v) => /export\s+const\s+metadata\s*=\s*{/.test(v))

  const data = {
    path: `${documentTypeName}/${componentDir}/index.tsx`,
    component: fileContent
      .split("\n")
      .slice(0, index)
      .filter((line) => !line.includes("export"))
      .join("\n"),
    metadata,
    slug: toKebabCase(`${documentTypeName}/${componentDir}`),
  }

  return data
}

export const getAllComponents = async (): Promise<ComponentInfo[]> => {
  const root = path.join(process.cwd(), "contents")
  const parent = getDirNames(root)
  const paths: string[] = []

  for (const item of parent) {
    const parentFullPath = path.join(root, item)
    readdirSync(parentFullPath, { withFileTypes: true })
      .filter((dir) => dir.isDirectory())
      .forEach((r) => {
        paths.push(`${item}/${r.name}`)
      })
  }

  const promises = paths.map(async (componentName: string) => {
    const { metadata } = await import("../contents/" + componentName + "/index")

    const filePath = path.join(root, componentName, "index.tsx")

    const fileContent = readFileSync(filePath, "utf8")
    const index = fileContent
      .split("\n")
      .findIndex((v) => /export\s+const\s+metadata\s*=\s*{/.test(v))
    const code = fileContent
      .split("\n")
      .slice(0, index)
      .filter((line) => !line.includes("export"))
      .join("\n")

    return {
      component: componentName,
      slug: convertCase(componentName),
      attributes: metadata,
      code: code,
    }
  })

  const results = await Promise.all(promises)

  return results.filter((c) => c)
}

export const getComponentsByCategory = async (
  documentTypeName: string,
  category: string,
) => {
  const contentsDir = path.join(process.cwd(), "contents")
  const root = path.join(contentsDir, documentTypeName, category)
  const components = getDirNames(root)
  const promises = components.map(async (componentName: string) => {
    const data = await getComponent(
      documentTypeName,
      category + "/" + componentName,
    )

    return data
  })

  return await Promise.all(promises)
}

export const getCategoriesByDocName = (documentTypeName: string) => {
  const root = path.join(process.cwd(), "contents", documentTypeName)
  return getDirNames(root).map((child) => ({
    name: child,
    slug: toKebabCase(path.join(documentTypeName, child)),
  }))
}
