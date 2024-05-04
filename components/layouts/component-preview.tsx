import {
  Box,
  Skeleton,
  UIProvider,
  useAsync,
  useBoolean,
} from "@yamada-ui/react"
import type { SkeletonProps, ThemeConfig, UsageTheme } from "@yamada-ui/react"
import dynamic from "next/dynamic"
import type { FC } from "react"
import { useEffect, useState } from "react"
import type { ComponentMetadata } from "types"

export const Preview: FC<
  SkeletonProps & { path: string; metadata: ComponentMetadata }
> = ({ path, metadata, ...rest }) => {
  const Component = dynamic<{ metadata: ComponentMetadata }>(
    () => import(`../../contents/${path}`),
  )
  const [uiTheme, setUiTheme] = useState<UsageTheme>()
  const [uiConfig, setUiConfig] = useState<ThemeConfig>()

  useAsync(async () => {
    const { theme, config } = await import(`../../contents/${path}`)
    setUiTheme(theme ? { ...theme } : undefined)
    setUiConfig(config ? { ...config } : undefined)
  }, [])
  const [isMounted, { on }] = useBoolean()

  useEffect(on, [on])

  return (
    <UIProvider theme={uiTheme} config={uiConfig}>
      <Skeleton
        isLoaded={isMounted}
        rounded="md"
        w="full"
        isFitContent
        {...rest}
      >
        <Box
          as={Component}
          metadata={metadata}
          p="md"
          borderWidth="1px"
          rounded="md"
        />
      </Skeleton>
    </UIProvider>
  )
}
