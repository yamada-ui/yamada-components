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

export const DividedComponent: FC<DivideComponentProps> = ({ component }) => {
  const { locale } = useI18n()

  const pickedComponent = component
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
      {pickedComponent.map((r, i) => (
        <Tab key={i}>{r.name}</Tab>
      ))}
      {pickedComponent.map((r, i) => (
        <TabPanel key={i}>
          <ComponentPreview path="" code={r.code} />
        </TabPanel>
      ))}
    </Tabs>
  )
}
