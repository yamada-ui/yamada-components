import { Avatar, HStack, Text, VStack } from "@yamada-ui/react"
import type { FC } from "react"

const AvatarWithText: FC = () => {
  return (
    <HStack>
      <Avatar
        src="https://avatars.githubusercontent.com/u/109452865?v=4"
        name="Taku"
      />

      <VStack gap="0">
        <Text lineClamp={1}>Taku</Text>
        <Text color="muted" lineClamp={1}>
          @taku10101
        </Text>
      </VStack>
    </HStack>
  )
}

export default AvatarWithText
