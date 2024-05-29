import { readFile, writeFile } from "fs/promises"
import { Octokit } from "@octokit/rest"
import type { Dict } from "@yamada-ui/react"
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

const getMetadataPaths = async () => await glob("contents/**/metadata.json")

const updateMetadata = async (path: string, _authors: Author[]) => {
  let data = await readFile(path, "utf-8")

  const metadata = JSON.parse(data) as Dict
  const authors = _authors.map(({ id, login, avatar_url, html_url }) => ({
    id,
    login,
    avatar_url,
    html_url,
  }))

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

const getAuthors = async (paths: string[]) => {
  const authorMap: Record<string, Author[]> = {}

  await Promise.all(
    paths.map(async (path) => {
      const commits = await getCommits(path.replace(/\/metadata.json$/, ""))

      const authors: Record<string, Author> = {}

      commits.forEach(({ author }) => {
        if (author.type !== "User") return

        authors[author.id] = author
      })

      authorMap[path] = Object.values(authors)
    }),
  )

  return authorMap
}

const main = async () => {
  try {
    const metadataPaths = await getMetadataPaths()
    const authorMap = await getAuthors(metadataPaths)

    await Promise.all(
      Object.entries(authorMap).map(async ([path, authors]) => {
        await updateMetadata(path, authors)
      }),
    )
  } catch (e) {
    if (e instanceof Error) console.log(e.message)
  }
}

main()
