import {
  Box,
  Skeleton,
  Tab,
  TabPanel,
  Tabs,
  UIProvider,
  useBoolean,
} from "@yamada-ui/react"
import type { SkeletonProps } from "@yamada-ui/react"
import dynamic from "next/dynamic"
import type { ComponentProps, FC } from "react"
import { useEffect, useState } from "react"
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
  // ダイナミックインポート
  const Component = dynamic(() => import(`../../contents/${path}`))

  const [uiTheme, setUiTheme] = useState()

  const loadComponent = async () => {
    const { theme } = await import(`../../contents/${path}`)
    setUiTheme({ ...theme })
  }

  useEffect(() => {
    loadComponent()
    /* eslint-disable-next-line */
  }, [])

  console.log(uiTheme)

  return (
    <UIProvider {...(uiTheme ? { theme: uiTheme } : {})}>
      <Box my="6">
        <Tabs align="end">
          <Tab>{t("component.component-preview.tab.preview")}</Tab>
          <Tab>{t("component.component-preview.tab.code")}</Tab>
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
    </UIProvider>
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
