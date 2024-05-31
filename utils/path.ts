import path from "node:path"
import { CONSTANT } from "constant"

export const getResolvedPath = (targetPath: string) =>
  joinPath(
    /^\/?docs\//.test(targetPath) ? CONSTANT.PATH.ROOT : process.cwd(),
    targetPath,
  )

export const joinPath = (...paths: string[]) =>
  path.join(...paths).replace(/\\/g, "/")
