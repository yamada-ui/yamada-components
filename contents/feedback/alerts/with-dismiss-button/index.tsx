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
    <Alert status="success" variant="subtle" maxW="5xl">
      <AlertIcon />
      <AlertTitle>Successfully uploaded</AlertTitle>
      <Spacer />
      <CloseButton color="success.400" />
    </Alert>
  )
}

export default WithDismissButton
