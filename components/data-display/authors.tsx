import { Avatar, AvatarGroup, Box, forwardRef, Tooltip } from "@yamada-ui/react"
import type { AvatarGroupProps, AvatarProps } from "@yamada-ui/react"
import { memo } from "react"
import type { Author } from "component"

export type AuthorsProps = AvatarGroupProps & {
  authors?: Author[] | null
  avatarSize?: AvatarProps["boxSize"]
}

export const Authors = memo(
  forwardRef<AuthorsProps, "div">(
    ({ authors, avatarSize = "7", ...rest }, ref) => {
      if (!authors?.length) return null

      return (
        <AvatarGroup
          ref={ref}
          borderColor={["white", "black"]}
          gap="-3"
          max={5}
          {...rest}
        >
          {authors.map(({ login, avatar_url, html_url }) => (
            <Box
              key={login}
              position="relative"
              borderRadius="full"
              sx={{ borderWidth: "3px" }}
              bg={["white", "black"]}
            >
              <Tooltip label={login} placement="top" flexShrink="0">
                <Avatar
                  as="a"
                  target="_blank"
                  href={html_url}
                  name={login}
                  src={avatar_url}
                  boxSize={avatarSize}
                />
              </Tooltip>
            </Box>
          ))}
        </AvatarGroup>
      )
    },
  ),
)

Authors.displayName = "Authors"
