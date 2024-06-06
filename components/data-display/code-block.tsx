import { Box, Text, useColorModeValue } from "@yamada-ui/react"
import type { HighlightProps } from "prism-react-renderer"
import { Highlight, themes } from "prism-react-renderer"
import type { FC } from "react"

export type CodeBlockProps = Omit<HighlightProps, "children">

export const CodeBlock: FC<CodeBlockProps> = ({ language, theme, ...rest }) => {
  const defaultTheme = useColorModeValue(themes.oneLight, themes.oneDark)

  return (
    <Highlight language={language} theme={theme ?? defaultTheme} {...rest}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Box fontSize="sm" overflowX="auto" data-language={language}>
          <Box
            as="pre"
            className={className}
            minW="fit-content"
            style={{ ...style, backgroundColor: "inherit" }}
          >
            {tokens.map((line, index) => (
              <Box key={index} minW="fit-content" {...getLineProps({ line })}>
                {line.map((token, index) => (
                  <Text key={index} as="span" {...getTokenProps({ token })} />
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Highlight>
  )
}
