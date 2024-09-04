import { Avatar, AvatarGroup, Motion, Tooltip } from "@yamada-ui/react"
import type { FC } from "react"
import { users } from "./users"

const AvatarWithHoverFramer: FC = () => {
  return (
    <AvatarGroup
      as={Motion}
      whileHover={{
        maxWidth: "450px",
      }}
      maxW="md"
      w="full"
      gap="-20"
      justifyContent="space-between"
      display="flex"
    >
      {users.map((user, index) => (
        <Motion
          key={user.id}
          position="relative"
          whileHover={{
            scale: 1.3,
            zIndex: 1,
          }}
          whileTap={{
            scale: 1.3,
            zIndex: 1,
          }}
          borderRadius="full"
          borderWidth="3px"
          zIndex={0}
          borderColor={["white", "black"]}
          transitionDelay="0s"
          transitionDuration="fast"
          display={{
            sm: index > 5 ? "none" : "flex",
          }}
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
