import * as CalendarComponents from "@yamada-ui/calendar"
import * as CarouselComponents from "@yamada-ui/carousel"
import * as DropzoneComponents from "@yamada-ui/dropzone"
import { Icon as FontAwesomeIcon } from "@yamada-ui/fontawesome"
import * as MarkdownComponents from "@yamada-ui/markdown"
import * as UIComponents from "@yamada-ui/react"
import {
  Box,
  Text,
  Skeleton,
  useBoolean,
  useDisclosure,
  useUpdateEffect,
  useResizeObserver,
  ScrollArea,
  Button,
  ThemeProvider,
  LoadingProvider,
  ResetStyle,
  GlobalStyle,
  NoticeProvider,
} from "@yamada-ui/react"
import type { SkeletonProps, UIProviderProps } from "@yamada-ui/react"
import * as TableComponents from "@yamada-ui/table"
import type { FC, PropsWithChildren } from "react"
import React, { useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live"
import { CopyButton } from "components/forms/copy-button"
import { useI18n } from "contexts/i18n-context"
import { theme as defaultTheme } from "theme"

const UIProvider: FC<UIProviderProps> = ({
  theme = defaultTheme,
  config,
  children,
}) => {
  return (
    <ThemeProvider theme={theme} config={config}>
      <LoadingProvider {...config.loading}>
        <ResetStyle />
        <GlobalStyle />

        {children}

        <NoticeProvider {...config.notice} />
      </LoadingProvider>
    </ThemeProvider>
  )
}

// 後々必要なものを足していく
const react = { React, ...React }
const components = {
  ...UIComponents,
  ...CarouselComponents,
  ...TableComponents,
  ...CalendarComponents,
  ...DropzoneComponents,
  ...MarkdownComponents,
  FontAwesomeIcon,
  UIProvider,
}
const utils = { useForm, Controller }
const scope = {
  ...react,
  ...components,
  ...utils,
}

export const ComponentPreview: FC<{ path: string; code: string }> = ({
  path,
  code,
}) => {
  const { t } = useI18n()
  const transformCode = (code: string) => {
    const codeLines = code.split("\n")
    let codeSnippet = "" // React Liveで表示させるコード
    let componentName = "" // コンポーネント名

    for (const line of codeLines) {
      // import {} from "" を削除
      if (!line.includes("import")) {
        codeSnippet += line + "\n"
        if (codeSnippet.includes("const")) {
          // const 変数名をcomponentNameに格納
          const match = line.match(
            /const\s+(\w+)\s*:\s*FC\s*=\s*\(\s*\)\s*=>\s*{/,
          )
          if (match && match.length >= 2) {
            componentName = match[1]
          }
        }
      }
    }
    return `${codeSnippet}\nrender(<${componentName}/>)`
  }

  return (
    <Box>
      <Text>Component: {path}</Text>
      <LiveProvider
        {...{
          code,
          scope,
          transformCode,
        }}
        enableTypeScript
        noInline
      >
        <Box my="6">
          <Preview>
            <Box
              as={LivePreview}
              p="md"
              borderWidth="1px"
              rounded="md"
              overflowX="auto"
            />
          </Preview>
          <Box rounded="md" overflow="hidden" my="4" position="relative">
            <Box py="2" bg={["neutral.800", "neutral.900"]} w="full">
              <Text
                color="whiteAlpha.700"
                fontSize="xs"
                fontWeight="semibold"
                textAlign="center"
                textTransform="uppercase"
                userSelect="none"
                pointerEvents="none"
              >
                {t("component.component-preview.label")}
              </Text>
            </Box>
            <Editor>
              <Box
                as={LiveEditor}
                px="md"
                fontSize="sm"
                overflowX="auto"
                sx={{
                  "& > pre": { p: "0px !important", bg: "none !important" },
                }}
              />
            </Editor>
            <CopyButton
              value={code}
              position="absolute"
              top="1.125rem"
              right="4"
            />
          </Box>
          <Box
            as={LiveError}
            bg="danger"
            overflowX="auto"
            rounded="md"
            p="md"
            fontSize="sm"
            color="white"
          />
        </Box>
      </LiveProvider>
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

const Editor: FC<PropsWithChildren> = ({ children }) => {
  const [isMax, { on, off }] = useBoolean()
  const { isOpen, onToggle, onClose } = useDisclosure()
  const [ref, rect] = useResizeObserver<HTMLDivElement>()
  const { t } = useI18n()

  useUpdateEffect(() => {
    const { height } = rect

    if (height >= 320) {
      on()
    } else {
      off()
      onClose()
    }
  }, [rect])

  return (
    <>
      <ScrollArea
        ref={ref}
        bg={["neutral.800", "neutral.900"]}
        sx={{ "& > div": { pt: "0", pb: isMax ? "10" : "6" } }}
        maxH={isOpen ? "full" : "sm"}
        _scrollbarThumb={{
          bg: "whiteAlpha.600",
          bgClip: "padding-box",
          border: "3px solid transparent",
          rounded: "full",
          _nativeHover: {
            bg: "whiteAlpha.800",
            bgClip: "padding-box",
          },
        }}
        tabIndex={-1}
      >
        {children}
      </ScrollArea>

      {isMax && (
        <Button
          size="sm"
          position="absolute"
          rounded="full"
          bottom="2"
          left="50%"
          transform="translateX(-50%)"
          onClick={onToggle}
        >
          {t(
            isOpen
              ? "component.component-preview.control-button.close"
              : "component.component-preview.control-button.open",
          )}
        </Button>
      )}
    </>
  )
}
