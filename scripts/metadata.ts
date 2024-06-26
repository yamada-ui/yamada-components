import { readFile } from "fs/promises"
import * as p from "@clack/prompts"
import { Octokit } from "@octokit/rest"
import { isEmpty } from "@yamada-ui/react"
import c from "chalk"
import { glob } from "glob"

const COMMON_PARAMS = { owner: "yamada-ui", repo: "yamada-components" }

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

const getMetadataPaths: p.RequiredRunner = () => async (_, s) => {
  s.start(`Getting the Yamada Components metadata paths`)

  const metadataPaths = await glob("contents/**/metadata.json")

  s.stop(`Got the Yamada Components metadata paths`)

  return metadataPaths
}

const checkMetadata = async (filePath: string) => {
  const data = await readFile(filePath, "utf-8")
  const metadata = JSON.parse(data)

  const locales = ["ja", "en"]
  const fields = ["title", "description"]
  const missing = [] as string[]

  locales.forEach((locale) => {
    fields.forEach((field) => {
      if (!metadata[locale]?.[field] || metadata[locale][field].length === 0) {
        missing.push(`${locale}.${field}`)
      }
    })
  })

  if (!isEmpty(missing)) {
    await createIssue(filePath, missing)
  }
}

const ISSUE_TITLE = (path: string, missing: string[]) =>
  `Missing \`${missing.join("`, `")}\` in \`${path}\``

const ISSUE_BODY = (path: string, missing: string[], title: string) => `
Thank you for submitting a feature request! 😎

If you have an idea for a new feature topic, notice something is not working as intended, or feel there is an error with the current functionality, you are in the right place!

**Subject**
${title}

**Description**
The following are missing and need to be added in \`${path}\`:

${missing.map((m) => `- Empty ${m} in ${path}`).join("\n")}

**Are you willing to participate in the development of this feature and create a pull request?**
None

This issue will be automatically unassigned after two weeks have passed since it was assigned.
Once unassigned, it may be picked up by someone else for work.
`

const createIssue = async (path: string, missing: string[]) => {
  const { owner, repo } = COMMON_PARAMS

  const title = ISSUE_TITLE(path, missing)
  const body = ISSUE_BODY(path, missing, title)

  const existingIssues = await octokit.rest.issues.listForRepo({
    owner,
    repo,
    state: "open",
  })

  const issueExists = existingIssues.data.some((issue) => issue.title === title)

  if (issueExists) {
    console.log(`An open issue with the title "${title}" already exists.`)
    return
  }

  const issue = await octokit.rest.issues.create({
    owner,
    repo,
    title,
    body,
    labels: ["enhancement"],
  })

  console.log(`Created issue ${issue.data.number} for ${path}`)
}

const main = async () => {
  p.intro(c.magenta(`Checking Yamada Components metadata`))
  const s = p.spinner()
  const metadataPaths = await getMetadataPaths()(p, s)

  await Promise.all(metadataPaths.map(checkMetadata))

  s.stop(`Checked Yamada Components metadata`)
}

main()
