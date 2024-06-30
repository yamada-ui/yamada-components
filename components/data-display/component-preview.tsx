import {
  Box,
  Center,
  extendConfig,
  forwardRef,
  Loading,
  UIProvider,
  useAsync,
} from "@yamada-ui/react"
import type {
  BoxProps,
  Dict,
  HTMLUIProps,
  LoadingProps,
  ThemeConfig,
} from "@yamada-ui/react"
import dynamic from "next/dynamic"
import { memo, useMemo } from "react"
import type { Component, ComponentContainerProps } from "component"

export type ComponentPreviewProps = BoxProps &
  Pick<Component, "paths"> & {
    containerProps?: ComponentContainerProps
    loadingProps?: LoadingProps
  }

export const ComponentPreview = memo(
  forwardRef<ComponentPreviewProps, "div">(
    (
      { paths, containerProps: _containerProps, loadingProps, ...rest },
      ref,
    ) => {
      const Component = dynamic(() => import(`/contents/${paths.component}`))

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
        <Center
          ref={ref}
          flexDirection="column"
          boxSize="full"
          minH="48"
          {...rest}
        >
          <UIProvider {...value}>
            {!loading ? (
              <Box boxSize="full" flex="1" {...containerProps}>
                <Component />
              </Box>
            ) : (
              <Center boxSize="full" flex="1">
                <Loading size="6xl" {...loadingProps} />
              </Center>
            )}
          </UIProvider>
        </Center>
      )
    },
  ),
)

ComponentPreview.displayName = "ComponentPreview"
