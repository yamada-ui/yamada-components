import type { FC } from "react"
import { Avatar, AvatarGroup, Motion, Tooltip } from "@yamada-ui/react"
import { users } from "./users"

const AvatarWithHoverFramer: FC = () => {
  return (
    <AvatarGroup
      as={Motion}
      display="flex"
      gap="-20"
      justifyContent="space-between"
      maxW="md"
      w="full"
      whileHover={{
        maxWidth: "450px",
      }}
    >
      {users.map((user, index) => (
        <Motion
          key={user.id}
          borderColor={["white", "black"]}
          borderRadius="full"
          borderWidth="3px"
          display={{
            sm: index > 5 ? "none" : "flex",
          }}
          position="relative"
          transitionDelay="0s"
          transitionDuration="fast"
          whileHover={{
            scale: 1.3,
            zIndex: 1,
          }}
          whileTap={{
            scale: 1.3,
            zIndex: 1,
          }}
          zIndex={0}
        >
          <Tooltip flexShrink="0" label={user.name} placement="top">
            <Avatar name={user.name} src={user.src} size="lg" />
          </Tooltip>
        </Motion>
      ))}
    </AvatarGroup>
  )
}

export default AvatarWithHoverFramer
