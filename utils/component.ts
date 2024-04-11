import { existsSync, readFileSync, readdirSync } from "fs"
import path from "path"
import { toKebabCase } from "@yamada-ui/react"
import { CONSTANT } from "constant"
import type { ComponentInfo } from "types"

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

export const getPaths = ({
  documentTypeName,
  locales,
}: {
  documentTypeName: string
  locales: string[]
}) => {
  const defaultLocale = CONSTANT.I18N.DEFAULT_LOCALE
  const result: { params: { slug: string[] }; locale?: string }[] = []
  const root = path.join(process.cwd(), "contents", documentTypeName)
  const parent = getDirNames(root)
  for (const locale of locales || []) {
    result.push({ params: { slug: [] }, locale })
  }
  for (const item of parent) {
    const parentFullPath = path.join(root, item)
    for (const locale of locales || []) {
      result.push({ params: { slug: [item] }, locale })
    }
    readdirSync(parentFullPath, { withFileTypes: true })
      .filter((dir) => dir.isDirectory())
      .forEach((r) => {
        const dirPath = path.join(parentFullPath, r.name)
        const files = readdirSync(dirPath)
        for (const file of files) {
          const match = file.match(/index(?:\.(.+))?\.tsx$/)
          if (match) {
            const locale = match[1] || defaultLocale
            if (locales.includes(locale)) {
              result.push({ params: { slug: [item, r.name] }, locale })
            }
          }
        }
      })
  }
  return result
}

export const getComponent = async (
  documentTypeName: string,
  componentDir: string,
  locale: string,
) => {
  try {
    let filename = `index${
      locale !== CONSTANT.I18N.DEFAULT_LOCALE ? `.${locale}` : ""
    }`

    let filePath = path.join(
      process.cwd(),
      "contents",
      documentTypeName,
      componentDir,
      `${filename}.tsx`,
    )

    if (!existsSync(filePath)) {
      filename = "index"
      filePath = path.join(
        process.cwd(),
        "contents",
        documentTypeName,
        componentDir,
        `${filename}.tsx`,
      )
    }

    const { metadata } = await import(
      `../contents/${documentTypeName}/${componentDir}/${filename}`
    )

    const fileContent = readFileSync(filePath, "utf8")
    const index = fileContent
      .split("\n")
      .findIndex((v) => /export\s+const\s+metadata\s*=\s*{/.test(v))

    const data = {
      path: `${documentTypeName}/${componentDir}/${filename}.tsx`,
      component: fileContent
        .split("\n")
        .slice(0, index)
        .filter((line) => !line.includes("export"))
        .join("\n"),
      metadata,
      slug: toKebabCase(`${documentTypeName}/${componentDir}`),
    }

    return data
  } catch (error) {
    return null
  }
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
      slug: toKebabCase(componentName),
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
  locale: string,
) => {
  try {
    const contentsDir = path.join(process.cwd(), "contents")
    const root = path.join(contentsDir, documentTypeName, category)
    const components = getDirNames(root)
    const promises = components.map(async (componentName: string) => {
      const data = await getComponent(
        documentTypeName,
        category + "/" + componentName,
        locale,
      )

      return data
    })

    return await Promise.all(promises)
  } catch (error) {
    return null
  }
}

export const getCategoriesByDocName = (documentTypeName: string) => {
  try {
    const root = path.join(process.cwd(), "contents", documentTypeName)
    return getDirNames(root).map((child) => ({
      name: child,
      slug: toKebabCase(path.join(documentTypeName, child)),
    }))
  } catch (error) {
    return null
  }
}
