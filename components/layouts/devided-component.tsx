import { Tab, TabPanel, Tabs } from "@yamada-ui/react"
import type { FC } from "react"
import { ComponentPreview } from "./component-preview"
import { useI18n } from "contexts/i18n-context"

type DivideComponentProps = {
  component: {
    name: string
    code: string
  }[]
  path: string
}

export const DividedComponent: FC<DivideComponentProps> = ({
  component,
  path,
}) => {
  const { locale } = useI18n()

  const sortedComponent = component
    .map((r) => {
      const isJaFile = r.name.includes(".ja.")
      switch (locale) {
        case "en":
          return isJaFile ? null : r
        case "ja":
          return isJaFile ? r : null
      }
    })
    .filter(Boolean)

  return (
    <Tabs>
      {sortedComponent.map((r, i) => (
        <Tab key={i}>{r.name}</Tab>
      ))}
      {sortedComponent.map((r, i) => (
        <TabPanel key={i}>
          <ComponentPreview path={path} code={r.code} />
        </TabPanel>
      ))}
    </Tabs>
  )
}
