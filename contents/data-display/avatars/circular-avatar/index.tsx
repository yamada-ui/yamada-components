import { Avatar, AvatarGroup } from "@yamada-ui/react"
import type { FC } from "react"

const CircularAvatar: FC = () => {
  return (
    <AvatarGroup gap="md">
      <Avatar
        size="sm"
        src="https://avatars.githubusercontent.com/u/109452865?v=4"
      />
      <Avatar
        size="md"
        src="https://avatars.githubusercontent.com/u/109452865?v=4"
      />
      <Avatar
        size="lg"
        src="https://avatars.githubusercontent.com/u/109452865?v=4"
      />
      <Avatar
        size="xl"
        src="https://avatars.githubusercontent.com/u/109452865?v=4"
      />
    </AvatarGroup>
  )
}

export default CircularAvatar
