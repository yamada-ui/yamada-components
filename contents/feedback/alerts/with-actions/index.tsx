import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  ButtonGroup,
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
        <ButtonGroup gap="md">
          <Button variant="ghost" colorScheme="success">
            View Status
          </Button>
          <Button variant="ghost" colorScheme="success">
            Dismiss
          </Button>
        </ButtonGroup>
      </VStack>
    </Alert>
  )
}

export default WithActions
