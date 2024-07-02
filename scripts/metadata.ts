import { readFile } from "node:fs/promises"
import * as p from "@clack/prompts"
import { Octokit } from "@octokit/rest"
import c from "chalk"
import { config } from "dotenv"
import { glob } from "glob"

config()

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

const COMMON_PARAMS = { owner: "yamada-ui", repo: "yamada-components" }

const getMetadataPaths: p.RequiredRunner = () => async (_, s) => {
  s.start("Getting the Yamada Components metadata paths")

  const metadataPaths = await glob("contents/**/metadata.json")

  s.stop("Got the Yamada Components metadata paths")

  return metadataPaths
}

const validFormat = (text: string): boolean => {
  const regex = /[a-z][A-Z]/
  return !regex.test(text)
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

  const missingTranslations: string[] = []

  const invalidFormat: string[] = []

  for (const locale of locales) {
    for (const field of fields) {
      if (!metadata[locale]?.[field] || metadata[locale][field].length === 0) {
        missing[locale].push(field)
      }
      // if japanese title and or description is the same as english
      if (locale === "ja" && metadata[locale][field] === metadata.en[field]) {
        missingTranslations.push(field)
      }
    }
    // if English title has no space between words in title e.g. MyTitle instead of My Title
    if (locale === "en" && !validFormat(metadata.en.title)) {
      invalidFormat.push(metadata.en.title)
    }
  }

  return { missing, missingTranslations, invalidFormat }
}

const getLocation = (path: string) => {
  const pathSegments = path.replace(/\\/g, "/").split("/")
  return pathSegments.length > 3 ? pathSegments[2] : pathSegments[1]
}

const ISSUE_TITLE = (
  path: string,
  missing: Record<string, string[]>,
  missingTranslations: string[],
  invalidFormat: string[],
) => {
  const missingFields = Object.values(missing).flat()
  const allFields = [...missingFields]
  const uniqueFields = [...new Set(allFields)]

  let issueType = ""
  if (
    missingFields.length > 0 &&
    missingTranslations.length === 0 &&
    invalidFormat.length === 0
  ) {
    issueType = "Missing"
  } else if (
    missingFields.length === 0 &&
    missingTranslations.length > 0 &&
    invalidFormat.length === 0
  ) {
    issueType = "Missing translations"
  } else if (
    missingFields.length === 0 &&
    missingTranslations.length === 0 &&
    invalidFormat.length > 0
  ) {
    issueType = "Invalid format"
  } else {
    issueType = "Missing or invalid"
  }

  return `${issueType}${uniqueFields.length > 0 ? ` ${uniqueFields.join(" and ")}` : ""} in \`${getLocation(path)}\``
}

const formatMissingFields = (
  path: string,
  missing: Record<string, string[]>,
): string => {
  return Object.entries(missing)
    .map(([locale, fields]) =>
      fields
        .map(
          (field) =>
            `- Missing ${locale === "en" ? "English" : locale === "ja" ? "Japanese" : locale.charAt(0).toUpperCase() + locale.slice(1)} ${field} in \`${path.replace(/\\/g, "/")}\``,
        )
        .join("\n"),
    )
    .join("\n")
}

const formatMissingTranslations = (
  path: string,
  missingTranslations: string[],
): string => {
  return missingTranslations
    .map(
      (field) =>
        `- Missing Japanese translation for ${field} in \`${path.replace(/\\/g, "/")}\``,
    )
    .join("\n")
}

const formatInvalidFormats = (
  path: string,
  invalidFormat: string[],
): string => {
  return `#### Invalid format

Title should be \`Example Title\` instead of \`ExampleTitle\`

${invalidFormat
  .map(
    (field) =>
      `- Invalid format for \`${field}\` in \`${path.replace(/\\/g, "/")}\``,
  )
  .join("\n")}`
}

const issueDescription = (
  path: string,
  missing: Record<string, string[]>,
  missingTranslations: string[],
  invalidFormat: string[],
) => {
  const parts = []

  if (Object.entries(missing).length > 0) {
    parts.push(formatMissingFields(path, missing))
  }
  if (missingTranslations.length > 0) {
    parts.push(formatMissingTranslations(path, missingTranslations))
  }
  if (invalidFormat.length > 0) {
    parts.push(formatInvalidFormats(path, invalidFormat))
  }

  return parts.join("\n\n")
}

const ISSUE_BODY = (
  path: string,
  missing: Record<string, string[]>,
  missingTranslations: string[],
  invalidFormat: string[],
) => `
### Provide the exact quote of the error or issue

The following are missing and need to be added in \`${getLocation(path)}\`:

${issueDescription(path, missing, missingTranslations, invalidFormat).trim()}

### Does the feature already exist? Please link to it.

_No response_

### Are you willing to participate in fixing this issue and create a pull request with the fix?

None
`

const createIssue = async (
  path: string,
  missing: Record<string, string[]>,
  missingTranslations: string[],
  invalidFormat: string[],
) => {
  const { owner, repo } = COMMON_PARAMS

  const title = ISSUE_TITLE(path, missing, missingTranslations, invalidFormat)
  const body = ISSUE_BODY(path, missing, missingTranslations, invalidFormat)

  const existingIssues = await octokit.rest.search.issuesAndPullRequests({
    q: `repo:${owner}/${repo} is:open is:issue ${title} in:title`,
  })

  if (existingIssues.data.total_count > 0) {
    console.log(`An open issue with the title "${title}" already exists.`)
    return
  }

  await octokit.rest.issues.create({
    owner,
    repo,
    title,
    body,
  })
}

const main = async () => {
  p.intro(c.magenta("Checking Yamada Components metadata"))
  const s = p.spinner()
  try {
    const start = process.hrtime.bigint()
    const metadataPaths = await getMetadataPaths()(p, s)

    const missings: Array<
      Record<
        string,
        {
          missing: Record<string, string[]>
          missingTranslations: string[]
          invalidFormat: string[]
          path: string
        }
      >
    > = []

    await Promise.all(
      metadataPaths.map(async (path: string) => {
        await checkMetadata(path).then((data) => {
          if (
            Object.values(data.missing).some((fields) => fields.length > 0) ||
            data.missingTranslations.length > 0 ||
            data.invalidFormat.length > 0
          ) {
            const location = getLocation(path)
            const existingEntry = missings.find((entry) => entry[location])

            if (existingEntry) {
              existingEntry[location].missing = {
                ...existingEntry[location].missing,
                ...data.missing,
              }

              existingEntry[location].missingTranslations = [
                ...new Set([
                  ...existingEntry[location].missingTranslations,
                  ...data.missingTranslations,
                ]),
              ]

              existingEntry[location].invalidFormat = [
                ...new Set([
                  ...existingEntry[location].invalidFormat,
                  ...data.invalidFormat,
                ]),
              ]
            } else {
              missings.push({
                [location]: {
                  missing: data.missing,
                  missingTranslations: data.missingTranslations,
                  invalidFormat: data.invalidFormat,
                  path: path.replace(/\\/g, "/"),
                },
              })
            }
          }
          return data
        })
      }),
    )

    await Promise.all(
      missings.map(async (data) => {
        const location = Object.keys(data)[0]
        const { path, missing, missingTranslations, invalidFormat } =
          data[location]

        await createIssue(path, missing, missingTranslations, invalidFormat)
      }),
    )

    s.stop("Checked and created Yamada Components metadata issues")

    const end = process.hrtime.bigint()
    const duration = (Number(end - start) / 1e9).toFixed(2)

    p.outro(c.green(`Done in ${duration}s\n`))
  } catch (e) {
    if (e instanceof Error) console.log(e.message)
  }
}

main()
