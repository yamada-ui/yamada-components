import { Button, ButtonGroup } from "@yamada-ui/react"
import type { FC } from "react"

const Basic: FC = () => {
  return (
    <ButtonGroup isAttached variant="outline">
      <Button>Years</Button>
      <Button>Months</Button>
      <Button>Days</Button>
    </ButtonGroup>
  )
}

export default Basic
