import {
  Box,
  Center,
  forwardRef,
  Loading,
  UIProvider,
  useAsync,
} from "@yamada-ui/react"
import type { BoxProps, Dict, ThemeConfig } from "@yamada-ui/react"
import dynamic from "next/dynamic"
import { memo } from "react"
import type { Component } from "component"

export type ComponentPreviewProps = BoxProps & Pick<Component, "paths">

export const ComponentPreview = memo(
  forwardRef<ComponentPreviewProps, "div">(({ paths, ...rest }, ref) => {
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
      <Box ref={ref} boxSize="full" {...rest}>
        <UIProvider {...value}>
          {!loading ? (
            <Component />
          ) : (
            <Center boxSize="full">
              <Loading size="6xl" />
            </Center>
          )}
        </UIProvider>
      </Box>
    )
  }),
)

ComponentPreview.displayName = "ComponentPreview"
