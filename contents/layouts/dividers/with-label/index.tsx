import { HStack, Divider, Text } from "@yamada-ui/react"
import type { FC } from "react"

const WithLabel: FC = () => {
  return (
    <HStack>
      <Divider />
      <Text>Continue</Text>
      <Divider />
    </HStack>
  )
}

export default WithLabel
