import type { AvatarGroupProps, AvatarProps } from "@yamada-ui/react"
import type { Author } from "component"
import { Avatar, AvatarGroup, Box, forwardRef, Tooltip } from "@yamada-ui/react"
import { memo } from "react"

export type AuthorsProps = {
  authors?: Author[] | null
  avatarSize?: AvatarProps["boxSize"]
} & AvatarGroupProps

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
          {authors.map(({ avatar_url, html_url, login }) => (
            <Box
              key={login}
              sx={{ borderWidth: "3px" }}
              bg={["white", "black"]}
              borderRadius="full"
              position="relative"
            >
              <Tooltip flexShrink="0" label={login} placement="top">
                <Avatar
                  as="a"
                  href={html_url}
                  name={login}
                  src={avatar_url}
                  target="_blank"
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
