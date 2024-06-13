import { readFile, writeFile } from "fs/promises"
import * as p from "@clack/prompts"
import { Octokit } from "@octokit/rest"
import type { Dict } from "@yamada-ui/react"
import c from "chalk"
import { config } from "dotenv"
import { glob } from "glob"
import { prettier, recursiveOctokit } from "./utils"

type Commit = Awaited<
  ReturnType<typeof octokit.repos.listCommits>
>["data"][number]
type Author = Commit["author"]

const COMMON_PARAMS = { owner: "yamada-ui", repo: "yamada-components" }

config()

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

const getMetadataPaths: p.RequiredRunner = () => async (_, s) => {
  s.start(`Getting the Yamada UI metadata paths`)

  const metadataPaths = await glob("contents/**/metadata.json")

  s.stop(`Got the Yamada UI metadata paths`)

  return metadataPaths
}

const updateMetadata = async (path: string, _authors: Author[]) => {
  let data = await readFile(path, "utf-8")

  const metadata = JSON.parse(data) as Dict
  const authors = _authors.map((author) => {
    const { id, login, avatar_url, html_url } = author ?? {}

    return {
      id,
      login,
      avatar_url,
      html_url,
    }
  })

  data = JSON.stringify({ ...metadata, authors })
  data = await prettier(data)

  await writeFile(path, data)
}

const getCommits = async (path: string) => {
  let commits: Commit[] = []
  let page = 1
  let count = 0
  const perPage = 100

  const listForRepo = async () => {
    const { data } = await octokit.repos.listCommits({
      ...COMMON_PARAMS,
      sha: "main",
      path,
      per_page: perPage,
      page,
    })

    commits.push(...data)

    count = data.length

    if (count === perPage) {
      page++

      await recursiveOctokit(listForRepo)
    }
  }

  await recursiveOctokit(listForRepo)

  return commits
}

const getAuthors: p.RequiredRunner<
  [string[]],
  Promise<Record<string, Author[]>>
> = (paths) => async (_, s) => {
  s.start(`Getting the Yamada UI contributors`)

  const authorMap: Record<string, Author[]> = {}

  await Promise.all(
    paths.map(async (path) => {
      const commits = await getCommits(path.replace(/\/metadata.json$/, ""))

      const commitMap: Record<string, { count: number; author: Author }> = {}

      commits.forEach(({ author }) => {
        if (author?.type !== "User") return

        if (commitMap.hasOwnProperty(author.id)) {
          commitMap[author.id] = {
            count: commitMap[author.id].count + 1,
            author,
          }
        } else {
          commitMap[author.id] = { count: 1, author }
        }
      })

      authorMap[path] = Object.values(commitMap)
        .sort((a, b) => b.count - a.count)
        .map(({ author }) => author)
    }),
  )

  s.stop(`Got the Yamada UI contributors`)

  return authorMap
}

const main = async () => {
  p.intro(c.magenta(`Generating Yamada UI contributors`))

  const s = p.spinner()

  try {
    const start = process.hrtime.bigint()

    const metadataPaths = await getMetadataPaths()(p, s)
    const authorMap = await getAuthors(metadataPaths)(p, s)

    s.start(`Writing the metadata`)

    await Promise.all(
      Object.entries(authorMap).map(async ([path, authors]) => {
        await updateMetadata(path, authors)
      }),
    )

    s.stop(`Wrote the metadata`)

    const end = process.hrtime.bigint()
    const duration = (Number(end - start) / 1e9).toFixed(2)

    p.outro(c.green(`Done in ${duration}s\n`))
  } catch (e) {
    if (e instanceof Error) console.log(e.message)
  }
}

main()
