import { Checkbox, CheckboxGroup } from "@yamada-ui/react"
import type { FC } from "react"

const GroupedCheckboxes: FC = () => {
  return (
    <CheckboxGroup>
      <Checkbox>Yamada UI</Checkbox>
      <Checkbox>React component library</Checkbox>
      <Checkbox>Bringing your ideas to life</Checkbox>
    </CheckboxGroup>
  )
}

export default GroupedCheckboxes
