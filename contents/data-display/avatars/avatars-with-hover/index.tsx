import type { FC } from "react"
import { Avatar, AvatarGroup, Box, Tooltip } from "@yamada-ui/react"
import { users } from "./users"

const AvatarWithHover: FC = () => {
  return (
    <AvatarGroup
      _hover={{
        div: {
          transitionDelay: "0s",
        },
      }}
    >
      {users.map((user, index) => (
        <Box
          key={user.id}
          sx={{
            "&:has(+ div:hover)": {
              transform: "scale(1.1)",
            },
            "&:hover": {
              transform: "scale(1.4)",
              zIndex: 1,
            },
            "&:hover + div": {
              transform: "scale(1.1)",
            },
            "&:not(:hover)": {
              zIndex: 0,
            },
          }}
          borderColor={["white", "black"]}
          borderRadius="full"
          display={{
            sm: index > 3 ? "none" : "flex",
            md: index > 4 ? "none" : "flex",
            lg: index > 6 ? "none" : "flex",
          }}
          position="relative"
          transitionDuration="slower"
          transitionProperty="transform, margin-inline, z-index"
        >
          <Tooltip flexShrink="0" label={user.name} placement="top">
            <Avatar name={user.name} src={user.src} size="lg" />
          </Tooltip>
        </Box>
      ))}
    </AvatarGroup>
  )
}

export default AvatarWithHover
