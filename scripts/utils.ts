import path from "path"
import type { RequestError } from "@octokit/request-error"
import { format, resolveConfig } from "prettier"
import type { Options } from "prettier"

export const prettier = async (content: string, options?: Options) => {
  const prettierConfig = await resolveConfig(
    path.join(process.cwd(), ".prettierrc"),
  )

  try {
    return format(content, {
      ...prettierConfig,
      parser: "json",
      ...options,
    })
  } catch {
    return content
  }
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const recursiveOctokit = async <T extends any = void>(
  callback: () => Promise<T>,
): Promise<T> => {
  try {
    return await callback()
  } catch (e) {
    const isForbidden = (e as RequestError).status === 403
    const isRateLimitExceeded =
      (e as RequestError).response?.headers["x-ratelimit-remaining"] === "0"

    if (isForbidden && isRateLimitExceeded) {
      const ratelimitReset =
        (e as RequestError).response?.headers?.["x-ratelimit-reset"] ?? "0"
      const resetTime = parseInt(ratelimitReset) * 1000
      const waitTime = resetTime - Date.now() + 1000

      await wait(waitTime)
      return await recursiveOctokit(callback)
    } else {
      throw e
    }
  }
}
