import type { FC } from "react"
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  VStack,
} from "@yamada-ui/react"

const WithDescription: FC = () => {
  return (
    <Alert variant="subtle" alignItems="flex-start" maxW="5xl" status="warning">
      <AlertIcon />
      <VStack>
        <AlertTitle>Attention needed</AlertTitle>
        <AlertDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          pariatur, ipsum similique veniam quo totam eius aperiam dolorum.
        </AlertDescription>
      </VStack>
    </Alert>
  )
}

export default WithDescription
