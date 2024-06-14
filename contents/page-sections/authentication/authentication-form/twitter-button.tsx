import { Twitter } from "@yamada-ui/lucide"
import { Button, type ButtonProps } from "@yamada-ui/react"

type TwitterButtonProps = ButtonProps

export function TwitterButton(props: TwitterButtonProps) {
  return (
    <Button
      leftIcon={<Twitter color="transparent" fill="#00ACEE" />}
      {...props}
    />
  )
}
