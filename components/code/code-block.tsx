import { Box, Text } from "@yamada-ui/react"
import type { HighlightProps as ReactHighlightProps } from "prism-react-renderer"
import { Highlight as ReactHighlight, themes } from "prism-react-renderer"
import type { FC } from "react"

export type HighlightProps = Omit<ReactHighlightProps, "children"> & {
  highlight?: string
}

export const Highlight: FC<HighlightProps> = ({
  language,
  theme = themes.oneDark,
  ...rest
}) => {
  return (
    <ReactHighlight language={language} theme={theme} {...rest}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Box fontSize="sm" overflowX="auto" data-language={language}>
          <Box
            as="pre"
            className={className}
            minW="fit-content"
            style={{ ...style, backgroundColor: "inherit" }}
          >
            {tokens.map((line, index) => (
              <Box
                key={index}
                minW="fit-content"
                pl="4"
                pr="16"
                {...getLineProps({ line, key: index })}
              >
                {line.map((token, index) => (
                  <Text
                    key={index}
                    as="span"
                    {...getTokenProps({ token, key: index })}
                  />
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </ReactHighlight>
  )
}
