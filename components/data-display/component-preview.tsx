import { Box, forwardRef, UIProvider, useAsync } from "@yamada-ui/react"
import type { BoxProps, Dict, ThemeConfig } from "@yamada-ui/react"
import dynamic from "next/dynamic"
import { memo } from "react"
import { useComponent } from "contexts/component-context"

export type ComponentPreviewProps = BoxProps & {}

export const ComponentPreview = memo(
  forwardRef<ComponentPreviewProps, "div">(({ ...rest }, ref) => {
    const { paths } = useComponent()
    const Component = dynamic(() => import(`/contents/${paths.component}`))

    const { value } = useAsync(async () => {
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
      <Box ref={ref} {...rest}>
        <UIProvider {...value}>
          <Component />
        </UIProvider>
      </Box>
    )
  }),
)

ComponentPreview.displayName = "ComponentPreview"
