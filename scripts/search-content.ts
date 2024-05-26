import { existsSync } from "fs"
import { readdir } from "fs/promises"
import * as p from "@clack/prompts"
import c from "chalk"
import { program } from "commander"
import { getResolvedPath } from "utils/path"

const getRecursivePaths = async (path: string): Promise<string[]> => {
  try {
    const dirents = await readdir(path, { withFileTypes: true })

    return (
      await Promise.all(
        dirents.flatMap(async (dirent) => {
          const resolvedPath = `${path}/${dirent.name}`

          if (dirent.isDirectory()) {
            return await getRecursivePaths(resolvedPath)
          } else {
            return resolvedPath
          }
        }),
      )
    ).flat()
  } catch {
    const isExist = existsSync(path)

    return isExist ? [path] : []
  }
}
const getPaths: p.RequiredRunner =
  (path: string = getResolvedPath("contents")) =>
  async (_, s): Promise<string[]> => {
    s.start(`Getting the Yamada Components paths`)

    const paths = getRecursivePaths(path)

    s.stop(`Got the Yamada Components paths`)

    return paths
  }

program.action(async () => {
  p.intro(c.magenta(`Generating Yamada Components search content`))
  const s = p.spinner()

  try {
    const start = process.hrtime.bigint()

    const paths = await getPaths()(p, s)
    console.log(paths)
    // await generateSearchContent(paths)(p, s)

    const end = process.hrtime.bigint()
    const duration = (Number(end - start) / 1e9).toFixed(2)

    p.outro(c.green(`Done in ${duration}s\n`))
  } catch (e) {
    s.stop(`An error occurred`, 500)

    p.cancel(c.red(e instanceof Error ? e.message : "Message is missing"))
  }
})

program.parse()
