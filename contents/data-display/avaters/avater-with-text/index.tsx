import { Avatar, Box, Text } from "@yamada-ui/react"
import type { FC } from "react"

const AvaterWithText: FC = () => {
  return (
    <Box display="flex" alignItems="center">
      <Avatar size="md" src="https://github.com/taku10101.png" />
      <Box>
        <Text ml={2}>Taku</Text>
        <Text ml={2}>@taku10101</Text>
      </Box>
    </Box>
  )
}

export default AvaterWithText
