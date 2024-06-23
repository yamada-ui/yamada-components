import { Avatar, AvatarGroup } from "@yamada-ui/react"
import type { FC } from "react"

const CircularAvatar: FC = () => {
  return (
    <AvatarGroup gap={4}>
      <Avatar size="sm" src="https://github.com/taku10101.png" />
      <Avatar size="md" src="https://github.com/taku10101.png" />
      <Avatar size="lg" src="https://github.com/taku10101.png" />
      <Avatar size="xl" src="https://github.com/taku10101.png" />
    </AvatarGroup>
  )
}

export default CircularAvatar
