import { Avatar, Box, Center, Text } from "@yamada-ui/react"
import type { FC } from "react"

const AvatarWithText: FC = () => {
  return (
    <Center gap="sm">
      <Avatar
        size="md"
        src="https://avatars.githubusercontent.com/u/109452865?v=4"
        name="Taku"
      />
      <Box>
        <Text>Taku</Text>
        <Text>@taku10101</Text>
      </Box>
    </Center>
  )
}

export default AvatarWithText
