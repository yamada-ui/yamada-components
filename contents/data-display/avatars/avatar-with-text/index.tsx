import { Avatar, Box, Center, Text } from "@yamada-ui/react"
import type { FC } from "react"

const AvatarWithText: FC = () => {
  return (
    <Center>
      <Avatar
        size="md"
        src="https://avatars.githubusercontent.com/u/109452865?v=4"
      />
      <Box ml="sm">
        <Text>Taku</Text>
        <Text>@taku10101</Text>
      </Box>
    </Center>
  )
}

export default AvatarWithText
