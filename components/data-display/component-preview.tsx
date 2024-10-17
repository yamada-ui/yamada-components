import type {
  Dict,
  Environment,
  FlexProps,
  HTMLUIProps,
  LoadingProps,
  ThemeConfig,
  UIProviderProps,
} from "@yamada-ui/react"
import type { Component, ComponentContainerProps } from "component"
import type { FC } from "react"
import createEmotionCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import weakMemoize from "@emotion/weak-memoize"
import {
  Box,
  Center,
  createThemeSchemeManager,
  EnvironmentProvider,
  extendConfig,
  Flex,
  forwardRef,
  GlobalStyle,
  Loading,
  LoadingProvider,
  NoticeProvider,
  ResetStyle,
  ThemeProvider,
  ui,
  useAsync,
  useColorMode,
  useTheme,
} from "@yamada-ui/react"
import dynamic from "next/dynamic"
import { memo, useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { config as defaultConfig, theme as defaultTheme } from "theme"

const UIProvider: FC<{ environment?: Environment } & UIProviderProps> = ({
  children,
  config = defaultConfig,
  environment,
  theme = defaultTheme,
  ...rest
}) => {
  return (
    <EnvironmentProvider environment={environment}>
      <ThemeProvider config={config} theme={theme} {...rest}>
        <LoadingProvider {...config.loading}>
          <ResetStyle />
          <GlobalStyle />
          {children}
          <NoticeProvider {...config.notice} />
        </LoadingProvider>
      </ThemeProvider>
    </EnvironmentProvider>
  )
}

export type ComponentPreviewProps = {
  iframe?: boolean
  isFullHeight?: boolean
  containerProps?: ComponentContainerProps
  loadingProps?: LoadingProps
} & FlexProps &
  Pick<Component, "paths">

const createCache = weakMemoize((container: Node) =>
  createEmotionCache({ key: "iframe-css", container }),
)

export const ComponentPreview = memo(
  forwardRef<ComponentPreviewProps, "div">(
    (
      {
        h,
        iframe,
        isFullHeight,
        minH,
        paths,
        containerProps: _containerProps,
        loadingProps,
        ...rest
      },
      ref,
    ) => {
      const Component = dynamic(
        async () => import(`/contents/${paths.component}`),
      )

      const { colorMode } = useColorMode()
      const { themeScheme } = useTheme()
      const iframeRef = useRef<HTMLIFrameElement>(null)
      const headRef = useRef<HTMLHeadElement | null>(null)
      const bodyRef = useRef<HTMLElement | null>(null)
      const head = headRef.current
      const body = bodyRef.current
      const [, forceUpdate] = useState({})
      const themeSchemeManager = createThemeSchemeManager("cookie")

      useEffect(() => {
        if (!iframeRef.current) return

        const iframe = iframeRef.current

        headRef.current = iframe.contentDocument?.head ?? null
        bodyRef.current = iframe.contentDocument?.body ?? null

        forceUpdate({})
      }, [])

      useEffect(() => {
        if (!iframeRef.current) return

        const iframe = iframeRef.current

        if (iframe.contentDocument) {
          iframe.contentDocument.documentElement.dataset.mode = colorMode
          iframe.contentDocument.documentElement.dataset.theme = themeScheme
          iframe.contentDocument.documentElement.style.colorScheme = colorMode
        }
      }, [colorMode, themeScheme])

      const { loading, value } = useAsync(async () => {
        let theme: Dict | undefined
        let config: ThemeConfig | undefined

        if (paths.theme) {
          const module = await import(`/contents/${paths.theme}`)
          theme = module.default ?? module.theme
        }
        if (paths.config) {
          const module = await import(`/contents/${paths.config}`)
          config = module.default ?? module.theme
        }

        config = extendConfig({
          breakpoint: { identifier: "@container" },
          ...config,
        })

        return { config, theme }
      })

      const containerProps = useMemo<HTMLUIProps>(() => {
        const { centerContent, ...rest } = _containerProps ?? {}

        let props: HTMLUIProps = {
          containerType: "inline-size",
          h: "full",
          overflow: "auto",
          w: "full",
          ...rest,
        }

        if (centerContent) {
          props = {
            ...props,
            display: "flex",
            placeContent: "center",
            placeItems: "center",
          }
        }

        if (isFullHeight) {
          props = {
            ...props,
            h: "full",
            minH: "full",
          }
        }

        return props
      }, [_containerProps, isFullHeight])

      const environment: Environment = {
        getDocument: () => iframeRef.current?.contentDocument ?? document,
        getWindow: () =>
          iframeRef.current?.contentDocument?.defaultView ?? window,
      }

      h ??= containerProps.h
      minH ??= containerProps.minH ?? "md"

      return (
        <Flex ref={ref} flexDirection="column" h={h} minH={minH} {...rest}>
          {iframe ? (
            <ui.iframe
              ref={iframeRef}
              flex="1"
              title="component-preview-iframe"
            >
              {head && body
                ? createPortal(
                    <CacheProvider value={createCache(head)}>
                      <UIProvider
                        {...{ ...value, environment, themeSchemeManager }}
                      >
                        {!loading ? (
                          <Box boxSize="full" {...containerProps}>
                            <Component />
                          </Box>
                        ) : (
                          <Center boxSize="full">
                            <Loading fontSize="6xl" {...loadingProps} />
                          </Center>
                        )}
                      </UIProvider>
                    </CacheProvider>,
                    body,
                  )
                : undefined}
            </ui.iframe>
          ) : (
            <UIProvider {...{ ...value, environment, themeSchemeManager }}>
              {!loading ? (
                <Box boxSize="full" flex="1" {...containerProps}>
                  <Component />
                </Box>
              ) : (
                <Center boxSize="full" flex="1">
                  <Loading fontSize="6xl" {...loadingProps} />
                </Center>
              )}
            </UIProvider>
          )}
        </Flex>
      )
    },
  ),
)

ComponentPreview.displayName = "ComponentPreview"
