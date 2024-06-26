import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  HStack,
  VStack,
} from "@yamada-ui/react"
import type { FC } from "react"

const WithActions: FC = () => {
  return (
    <Alert status="success" variant="subtle" alignItems="flex-start" maxW="5xl">
      <AlertIcon />
      <VStack gap={3}>
        <AlertTitle>Order completed</AlertTitle>
        <AlertDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          pariatur, ipsum similique veniam.
        </AlertDescription>
        <HStack gap={1}>
          <Button variant="ghost">View Status</Button>
          <Button variant="ghost">Dismiss</Button>
        </HStack>
      </VStack>
    </Alert>
  )
}

export default WithActions
