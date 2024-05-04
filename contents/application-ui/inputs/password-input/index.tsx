import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useBoolean,
} from "@yamada-ui/react"
import type { CFC } from "react"
import type { ComponentMetadata } from "types"

const PasswordInput: CFC = () => {
  const [show, { toggle }] = useBoolean()
  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={show ? "text" : "password"}
        placeholder="your password"
      />
      <InputRightElement w="4.5rem" isClick>
        <Button h="1.75rem" size="sm" onClick={toggle}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}

export default PasswordInput

export const metadata: ComponentMetadata = {
  title: "Password Input",
  description: "Passowrd Input Component",
}
