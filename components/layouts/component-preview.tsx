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
import { useI18n } from "contexts/i18n-context"

type ComponentPreviewProps = {
  component: ComponentProps<typeof DividedComponent>["component"]
  path: string
}

export const ComponentPreview: FC<ComponentPreviewProps> = ({
  path,
  component,
}) => {
  const { t } = useI18n()

  return (
    <Box my="6">
      <Tabs align="end">
        <Tab>{t("component.component-preview.tab.preview")}</Tab>
        <Tab>{t("component.component-preview.tab.code")}</Tab>
        <TabPanel mt={10}>
          <Preview path={path} />
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

export const Preview: FC<SkeletonProps & { path: string }> = ({
  path,
  ...rest
}) => {
  const Component = dynamic(() => import(`../../contents/${path}`))

  const [isMounted, { on }] = useBoolean()

  useEffect(on, [on])

  return (
    <Skeleton isLoaded={isMounted} rounded="md" w="full" isFitContent {...rest}>
      <Box
        as={Component}
        p="md"
        borderWidth="1px"
        rounded="md"
        overflowX="auto"
      />
    </Skeleton>
  )
}
