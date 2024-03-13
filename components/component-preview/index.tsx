import * as YamadaUI from "@yamada-ui/react"
import { Box, Text } from "@yamada-ui/react"
import type { FC } from "react"
import React from "react"
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live"
import { transformCode } from "utils/transform-code"

export const ComponentPreview: FC<{ path: string; code: string }> = ({
  path,
  code,
}) => {
  return (
    <Box>
      <Text>Component: {path}</Text>
      <LiveProvider
        code={code}
        scope={{ ...YamadaUI, ...React }}
        enableTypeScript
        noInline
        transformCode={transformCode}
      >
        <Box>
          <LiveEditor />
          <LivePreview />
        </Box>
        <LiveError />
      </LiveProvider>
    </Box>
  )
}
