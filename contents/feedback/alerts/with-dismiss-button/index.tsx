import {
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
  Spacer,
} from "@yamada-ui/react"
import type { FC } from "react"

const WithDismissButton: FC = () => {
  return (
    <Alert status="success" variant="subtle">
      <AlertIcon />
      <AlertTitle>Successfully uploaded</AlertTitle>
      <Spacer />
      <CloseButton />
    </Alert>
  )
}

export default WithDismissButton
