import { Avatar, AvatarGroup, Box, Tooltip } from "@yamada-ui/react"
import type { FC } from "react"
import { users } from "./users"

const AvatarWithHover: FC = () => {
  return (
    <AvatarGroup
      _hover={{
        div: {
          marginInline: "xs",
          transitionDelay: "0s",
        },
      }}
      gap="-3"
    >
      {users.map((user, index) => (
        <Box
          key={user.id}
          position="relative"
          borderRadius="full"
          sx={{
            borderWidth: "3px",
            "&:hover": {
              transform: "scale(1.5)",
              zIndex: 1,
            },
            "&:hover + div": {
              transform: "scale(1.2)",
            },
            "&:has(+ div:hover)": {
              transform: "scale(1.2)",
            },
            "&:not(:hover)": {
              zIndex: 0,
            },
          }}
          bg={["white", "black"]}
          transitionDuration="slower"
          transitionProperty="transform, margin-inline, z-index"
          display={{
            sm: index > 3 ? "none" : "flex",
            md: index > 4 ? "none" : "flex",
            lg: index > 6 ? "none" : "flex",
          }}
        >
          <Tooltip label={user.name} placement="top" flexShrink="0">
            <Avatar name={user.name} src={user.src} size="lg" />
          </Tooltip>
        </Box>
      ))}
    </AvatarGroup>
  )
}

export default AvatarWithHover
