import { Button, type ButtonProps } from "@yamada-ui/react"
import { Twitter } from "lucide-react"

type TwitterButtonProps = ButtonProps

export function TwitterButton(props: TwitterButtonProps) {
  return (
    <Button
      leftIcon={<Twitter color="transparent" fill="#00ACEE" />}
      {...props}
    />
  )
}
