import { Avatar, AvatarGroup, Motion, Tooltip } from "@yamada-ui/react"
import type { FC } from "react"
import { users } from "./users"

const AvatarWithHoverFramer: FC = () => {
  return (
    <AvatarGroup
      as={Motion}
      whileHover={{
        width: "500px",
      }}
      gap="-20"
      justifyContent="space-between"
      display="flex"
    >
      {users.map((user) => (
        <Motion
          key={user.id}
          position="relative"
          whileHover={{
            scale: 1.5,
            zIndex: 1,
          }}
          borderRadius="full"
          borderWidth="3px"
          zIndex={0}
          bg={["white", "black"]}
          transitionDelay="0s"
          transitionDuration="fast"
        >
          <Tooltip label={user.name} placement="top" flexShrink="0">
            <Avatar name={user.name} src={user.src} size="lg" />
          </Tooltip>
        </Motion>
      ))}
    </AvatarGroup>
  )
}

export default AvatarWithHoverFramer
