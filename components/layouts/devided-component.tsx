import { Tab, TabPanel, Tabs } from "@yamada-ui/react"
import type { FC } from "react"
import { Highlight } from "components/code/code-block"
import { CopyButton } from "components/forms/copy-button"
import { useI18n } from "contexts/i18n-context"

type Compoent = {
  name: string
  code: string
}

type DivideComponentProps = {
  component: Compoent[]
}

export const DividedComponent: FC<DivideComponentProps> = ({ component }) => {
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
          <Highlight code={r.code} language="tsx" />
          <CopyButton value={r.code} position="absolute" top="4rem" right="6" />
        </TabPanel>
      ))}
    </Tabs>
  )
}
