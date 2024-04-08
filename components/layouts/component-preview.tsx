import { Markdown } from "@yamada-ui/markdown"
import { Box, Text, Skeleton, useBoolean } from "@yamada-ui/react"
import type { SkeletonProps } from "@yamada-ui/react"
import dynamic from "next/dynamic"
import type { FC } from "react"
import React, { useEffect } from "react"
import { CopyButton } from "components/forms/copy-button"

export const ComponentPreview: FC<{ path: string; code: string }> = ({
  path,
  code,
}) => {
  // ダイナミックインポート
  const Component = dynamic(() => import(`../../contents/${path}`))
  const markdown = `
  \`\`\`tsx
${code}
\`\`\`
  `

  return (
    <Box>
      <Text>Component: {path}</Text>
      <Box my="6">
        <Preview>
          <Box
            as={Component}
            p="md"
            borderWidth="1px"
            rounded="md"
            overflowX="auto"
          />
        </Preview>
        <Box rounded="md" overflow="hidden" my="4" position="relative">
          <Markdown
            px="md"
            fontSize="sm"
            overflowX="auto"
            sx={{
              "& > pre": { p: "0px !important", bg: "none !important" },
            }}
          >
            {markdown}
          </Markdown>
          <CopyButton value={code} position="absolute" top="1rem" right="6" />
        </Box>
      </Box>
    </Box>
  )
}

const Preview: FC<SkeletonProps> = ({ ...rest }) => {
  const [isMounted, { on }] = useBoolean()

  useEffect(on, [on])

  return (
    <Skeleton
      isLoaded={isMounted}
      rounded="md"
      w="full"
      isFitContent
      {...rest}
    />
  )
}
