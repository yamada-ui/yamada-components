import type {
  ButtonProps,
  IconButtonProps,
  LinkProps as UILinkProps,
} from "@yamada-ui/react"
import type { LinkProps } from "next/link"
import type { FC } from "react"
import { Button, IconButton, Link as UILink } from "@yamada-ui/react"
import Link from "next/link"

export type NextLinkProps = UILinkProps

export const NextLink: FC<NextLinkProps> = ({ ...rest }) => {
  return <UILink as={Link} {...rest} />
}

export type NextLinkButtonProps = {
  isExternal?: boolean
} & ButtonProps &
  Omit<LinkProps, "as">

export const NextLinkButton: FC<NextLinkButtonProps> = ({
  isExternal,
  ...rest
}) => {
  return (
    <Button
      as={Link}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener" : undefined}
      {...rest}
    />
  )
}

export type NextLinkIconButtonProps = {
  isExternal?: boolean
} & IconButtonProps &
  Omit<LinkProps, "as">

export const NextLinkIconButton: FC<NextLinkIconButtonProps> = ({
  isExternal,
  ...rest
}) => {
  return (
    <IconButton
      as={Link}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener" : undefined}
      {...rest}
    />
  )
}
