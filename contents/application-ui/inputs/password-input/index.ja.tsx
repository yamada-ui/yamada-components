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
        placeholder="パスワード"
      />
      <InputRightElement w="4.5rem" isClick>
        <Button h="1.75rem" size="sm" onClick={toggle}>
          {show ? "隠す" : "表示"}
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}

export default PasswordInput

export const metadata: ComponentMetadata = {
  title: "パスワード入力",
  description: "パスワードを入力するコンポーネント",
}
