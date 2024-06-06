import { HStack, Divider, Text } from "@yamada-ui/react"
import type { FC } from "react"

const WithIcon: FC = () => {
  return (
    <HStack w="full">
      <Divider />
      <Text>Continue</Text>
      <Divider />
    </HStack>
  )
}

export default WithIcon
