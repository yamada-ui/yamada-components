import type { HighlightProps } from "prism-react-renderer"
import type { FC } from "react"
import { Box, Text, useColorModeValue } from "@yamada-ui/react"
import { Highlight, themes } from "prism-react-renderer"

export type CodeBlockProps = Omit<HighlightProps, "children">

export const CodeBlock: FC<CodeBlockProps> = ({ language, theme, ...rest }) => {
  const defaultTheme = useColorModeValue(themes.oneLight, themes.oneDark)

  return (
    <Highlight language={language} theme={theme ?? defaultTheme} {...rest}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Box data-language={language} fontSize="sm" overflowX="auto">
          <Box
            as="pre"
            className={className}
            style={{ ...style, backgroundColor: "inherit" }}
            minW="fit-content"
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
