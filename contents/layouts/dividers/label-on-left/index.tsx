import { HStack, Divider, Text } from "@yamada-ui/react"
import type { FC } from "react"

const LabelOnLeft: FC = () => {
  return (
    <HStack w="full">
      <Text>Continue</Text>
      <Divider />
    </HStack>
  )
}

export default LabelOnLeft
