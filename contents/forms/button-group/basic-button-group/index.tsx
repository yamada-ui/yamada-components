import { Button, ButtonGroup } from "@yamada-ui/react"
import type { FC } from "react"

const BasicButtonGroup: FC = () => {
  return (
    <ButtonGroup isAttached variant="outline">
      <Button>Years</Button>
      <Button>Months</Button>
      <Button>Days</Button>
    </ButtonGroup>
  )
}

export default BasicButtonGroup
