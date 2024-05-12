import {
  Box,
  Center,
  forwardRef,
  Loading,
  UIProvider,
  useAsync,
} from "@yamada-ui/react"
import type {
  BoxProps,
  Dict,
  LoadingProps,
  ThemeConfig,
} from "@yamada-ui/react"
import dynamic from "next/dynamic"
import { memo } from "react"
import type { Component } from "component"

export type ComponentPreviewProps = BoxProps &
  Pick<Component, "paths"> & {
    containerProps?: BoxProps
    loadingProps?: LoadingProps
  }

export const ComponentPreview = memo(
  forwardRef<ComponentPreviewProps, "div">(
    ({ paths, containerProps, loadingProps, ...rest }, ref) => {
      const Component = dynamic(() => import(`/contents/${paths.component}`))

      const { loading, value } = useAsync(async () => {
        let theme: Dict
        let config: ThemeConfig

        if (paths.theme) {
          const module = await import(`/contents/${paths.theme}`)
          theme = module.default ?? module.theme
        }
        if (paths.config) {
          const module = await import(`/contents/${paths.config}`)
          config = module.default ?? module.theme
        }

        return { theme, config }
      })

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
