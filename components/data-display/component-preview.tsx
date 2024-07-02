import createEmotionCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import weakMemoize from "@emotion/weak-memoize"
import {
  Box,
  Center,
  extendConfig,
  forwardRef,
  Loading,
  useAsync,
  ui,
  createColorModeManager,
  createThemeSchemeManager,
  ColorModeScript,
  ThemeSchemeScript,
} from "@yamada-ui/react"
import * as UIComponents from "@yamada-ui/react"
import type {
  BoxProps,
  Dict,
  HTMLUIProps,
  LoadingProps,
  ThemeConfig,
} from "@yamada-ui/react"
import dynamic from "next/dynamic"
import type { FC } from "react"
import { memo, useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import type { Component, ComponentContainerProps } from "component"
import { theme as defaultTheme, config as defaultConfig } from "theme"

const UIProvider: FC<UIComponents.UIProviderProps> = ({
  theme = defaultTheme,
  config = defaultConfig,
  children,
}) => {
  return (
    <UIComponents.ThemeProvider theme={theme} config={config}>
      <UIComponents.LoadingProvider {...config.loading}>
        <UIComponents.ResetStyle />
        <UIComponents.GlobalStyle />

        {children}

        <UIComponents.NoticeProvider {...config.notice} />
      </UIComponents.LoadingProvider>
    </UIComponents.ThemeProvider>
  )
}

export type ComponentPreviewProps = BoxProps &
  Pick<Component, "paths"> & {
    containerProps?: ComponentContainerProps
    loadingProps?: LoadingProps
  }

const createCache = weakMemoize((container: Node) =>
  createEmotionCache({ container, key: "iframe-css" }),
)

export const ComponentPreview = memo(
  forwardRef<ComponentPreviewProps, "div">(
    (
      { paths, containerProps: _containerProps, loadingProps, ...rest },
      ref,
    ) => {
      const Component = dynamic(() => import(`/contents/${paths.component}`))

      const colorModeManager = createColorModeManager("ssr")
      const themeSchemeManager = createThemeSchemeManager("ssr")

      const iframeRef = useRef<HTMLIFrameElement>(null)
      const headRef = useRef<HTMLHeadElement | null>(null)
      const bodyRef = useRef<HTMLElement | null>(null)
      const head = headRef.current
      const body = bodyRef.current
      const [, forceUpdate] = useState({})

      useEffect(() => {
        if (!iframeRef.current) return

        const iframe = iframeRef.current

        headRef.current = iframe.contentDocument?.head ?? null
        bodyRef.current = iframe.contentDocument?.body ?? null

        document
          .querySelectorAll('style, link[rel="stylesheet"]')
          .forEach((style) => {
            headRef?.current?.appendChild(style.cloneNode(true))
          })

        forceUpdate({})
      }, [])

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

        return { theme, config }
      })

      const containerProps = useMemo<HTMLUIProps<"div">>(() => {
        const { centerContent, ...rest } = _containerProps ?? {}

        let props: HTMLUIProps<"div"> = {
          w: "full",
          h: "full",
          containerType: "inline-size",
          overflow: "auto",
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

        return props
      }, [_containerProps])

      return (
        <ui.iframe
          title="component-preview-iframe"
          ref={iframeRef}
          w="full"
          minH="md"
          h="full"
          display={rest.display}
        >
          {head && body
            ? createPortal(
                <>
                  <ColorModeScript
                    type="cookie"
                    nonce="testing"
                    initialColorMode={defaultConfig.initialColorMode}
                  />
                  <ThemeSchemeScript
                    type="cookie"
                    nonce="testing"
                    initialThemeScheme={defaultConfig.initialThemeScheme}
                  />
                  <CacheProvider value={createCache(head)}>
                    <UIProvider
                      {...value}
                      colorModeManager={colorModeManager}
                      themeSchemeManager={themeSchemeManager}
                    >
                      <Center
                        ref={ref}
                        flexDirection="column"
                        boxSize="full"
                        minH="48"
                        {...rest}
                      >
                        {!loading ? (
                          <Box boxSize="full" flex="1" {...containerProps}>
                            <Component />
                          </Box>
                        ) : (
                          <Center boxSize="full" flex="1">
                            <Loading size="6xl" {...loadingProps} />
                          </Center>
                        )}
                      </Center>
                    </UIProvider>
                  </CacheProvider>
                </>,
                body,
              )
            : undefined}
        </ui.iframe>
      )
    },
  ),
)

ComponentPreview.displayName = "ComponentPreview"
