import type { FC } from "react"
import {
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
  Spacer,
} from "@yamada-ui/react"

const WithDismissButton: FC = () => {
  return (
    <Alert variant="subtle" maxW="5xl" status="success">
      <AlertIcon />
      <AlertTitle>Successfully uploaded</AlertTitle>
      <Spacer />
      <CloseButton color="success.400" />
    </Alert>
  )
}

export default WithDismissButton
