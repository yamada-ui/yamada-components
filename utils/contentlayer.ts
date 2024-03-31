import { readdirSync } from "fs"

export const getDirNames = (basePath: string) =>
  readdirSync(basePath, { withFileTypes: true })
    .filter((dir) => dir.isDirectory())
    .map((dir) => dir.name)
