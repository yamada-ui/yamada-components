import type { ButtonProps } from "@yamada-ui/react"
import { TwitterIcon } from "@yamada-ui/lucide"
import { Button } from "@yamada-ui/react"

type TwitterButtonProps = ButtonProps

export function TwitterButton(props: TwitterButtonProps) {
  return (
    <Button
      leftIcon={<TwitterIcon color="transparent" fill="#00ACEE" />}
      {...props}
    />
  )
}
