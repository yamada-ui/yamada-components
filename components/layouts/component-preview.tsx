import {
  Box,
  Skeleton,
  Tab,
  TabPanel,
  Tabs,
  useBoolean,
} from "@yamada-ui/react"
import type { SkeletonProps } from "@yamada-ui/react"
import dynamic from "next/dynamic"
import type { ComponentProps, FC } from "react"
import React, { useEffect } from "react"
import { DividedComponent } from "./devided-component"

type ComponentPreviewProps = {
  component: ComponentProps<typeof DividedComponent>["component"]
  path: string
}

export const ComponentPreview: FC<ComponentPreviewProps> = ({
  path,
  component,
}) => {
  // ダイナミックインポート
  const Component = dynamic(() => import(`../../contents/${path}`))

  return (
    <Box my="6">
      <Tabs align="end">
        <Tab>preview</Tab>
        <Tab>code</Tab>
        <TabPanel mt={10}>
          <Preview>
            <Box
              as={Component}
              p="md"
              borderWidth="1px"
              rounded="md"
              overflowX="auto"
            />
          </Preview>
        </TabPanel>
        <TabPanel>
          <Box rounded="md" overflow="hidden" my="4" position="relative">
            <DividedComponent component={component} />
          </Box>
        </TabPanel>
      </Tabs>
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
