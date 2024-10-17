import type { FC } from "react"
import { Divider, HStack, Text } from "@yamada-ui/react"

const WithLabel: FC = () => {
  return (
    <HStack w="full">
      <Divider />
      <Text>Continue</Text>
      <Divider />
    </HStack>
  )
}

export default WithLabel
