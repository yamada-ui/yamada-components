import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  VStack,
} from "@yamada-ui/react"
import type { FC } from "react"

const WithDescription: FC = () => {
  return (
    <Alert status="warning" variant="subtle" alignItems="flex-start">
      {/* FIXME: Change Alert Icon */}
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
