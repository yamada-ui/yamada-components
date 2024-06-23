import { Button, ButtonGroup } from "@yamada-ui/react"
import type { FC } from "react"

const PrimaryButton: FC = () => {
  return (
    <ButtonGroup gap={7}>
      <Button size="xs">Button</Button>
      <Button size="sm">Button</Button>
      <Button size="md">Button</Button>
      <Button size="lg">Button</Button>
    </ButtonGroup>
  )
}
export default PrimaryButton
