import {
  Box,
  Skeleton,
  UIProvider,
  useAsync,
  useBoolean,
} from "@yamada-ui/react"
import type { SkeletonProps } from "@yamada-ui/react"
import dynamic from "next/dynamic"
import type { FC } from "react"
import { useEffect, useState } from "react"

export const Preview: FC<SkeletonProps & { path: string }> = ({
  path,
  ...rest
}) => {
  const Component = dynamic(() => import(`../../contents/${path}`))
  const [uiTheme, setUiTheme] = useState()

  useAsync(async () => {
    const { theme } = await import(`../../contents/${path}`)
    setUiTheme(theme ? { ...theme } : undefined)
  }, [])
  const [isMounted, { on }] = useBoolean()

  useEffect(on, [on])

  return (
    <UIProvider {...(uiTheme ? { theme: uiTheme } : {})}>
      <Skeleton
        isLoaded={isMounted}
        rounded="md"
        w="full"
        isFitContent
        {...rest}
      >
        <Box
          as={Component}
          p="md"
          borderWidth="1px"
          rounded="md"
          overflowX="auto"
        />
      </Skeleton>
    </UIProvider>
  )
}
