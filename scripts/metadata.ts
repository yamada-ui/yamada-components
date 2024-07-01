import { readFile } from "fs/promises"
import * as p from "@clack/prompts"
import { Octokit } from "@octokit/rest"
import c from "chalk"
import { glob } from "glob"

const COMMON_PARAMS = { owner: "yamada-ui", repo: "yamada-components" }

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

const getMetadataPaths: p.RequiredRunner = () => async (_, s) => {
  s.start("Getting the Yamada Components metadata paths")

  const metadataPaths = await glob("contents/**/metadata.json")

  s.stop("Got the Yamada Components metadata paths")

  return metadataPaths
}

const checkMetadata = async (filePath: string) => {
  const path = filePath.replace(/\\/g, "/")

  const data = await readFile(path, "utf-8")

  const metadata = JSON.parse(data)

  const locales = ["ja", "en"]
  const fields = ["title", "description"]
  const missing = locales.reduce(
    (acc, locale) => {
      acc[locale] = []
      return acc
    },
    {} as Record<string, string[]>,
  )

  locales.forEach((locale) => {
    fields.forEach((field) => {
      if (!metadata[locale]?.[field] || metadata[locale][field].length === 0) {
        missing[locale].push(field)
      }
    })
  })

  const hasMissing = Object.values(missing).some((fields) => fields.length > 0)

  if (hasMissing) {
    try {
      await createIssue(path, missing)
    } catch (e) {
      console.log(
        `Failed to create issue for ${path}\n${e instanceof Error ? e.message : "Message is missing"}`,
      )
    }
  }
}

const getLocation = (path: string) => {
  const pathSegments = path.replace(/\\/g, "/").split("/")
  return pathSegments.length > 3 ? pathSegments[2] : pathSegments[1]
}

const ISSUE_TITLE = (path: string, missing: Record<string, string[]>) => {
  const missingFields = Object.values(missing).flat()
  const uniqueFields = [...new Set(missingFields)]
  return `Missing \`${uniqueFields.join(" and ")}\` in ${getLocation(path)}`
}

const ISSUE_BODY = (path: string, missing: Record<string, string[]>) => `
### Provide the exact quote of the error or issue

The following are missing and need to be added in \`${getLocation(path)}\`:

${Object.entries(missing)
  .map(([locale, fields]) =>
    fields
      .map(
        (field) =>
          `- Missing ${locale === "en" ? "English" : locale === "ja" ? "Japanese" : locale.charAt(0).toUpperCase() + locale.slice(1)} ${field} in \`${path.replace(/\\/g, "/")}\``,
      )
      .join("\n"),
  )
  .join("\n")}

### Does the feature already exist? Please link to it.

_No response_

### Are you willing to participate in fixing this issue and create a pull request with the fix?

None
`

const createIssue = async (path: string, missing: Record<string, string[]>) => {
  const { owner, repo } = COMMON_PARAMS

  const title = ISSUE_TITLE(path, missing)
  const body = ISSUE_BODY(path, missing)

  const existingIssues = await octokit.rest.search.issuesAndPullRequests({
    q: `repo:${owner}/${repo} is:open is:issue ${title} in:title`,
  })

  console.log(existingIssues.data.total_count)

  if (existingIssues.data.total_count > 0) {
    console.log(`An open issue with the title "${title}" already exists.`)
    return
  }

  await octokit.rest.issues.create({
    owner,
    repo,
    title,
    body,
    labels: ["enhancement"],
  })
}

const main = async () => {
  p.intro(c.magenta("Checking Yamada Components metadata"))
  const s = p.spinner()
  const metadataPaths = await getMetadataPaths()(p, s)

  await Promise.all(metadataPaths.map(checkMetadata))

  s.stop("Checked Yamada Components metadata")
}

main()
