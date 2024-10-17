import type { FC } from "react"
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  ButtonGroup,
  VStack,
} from "@yamada-ui/react"

const WithActions: FC = () => {
  return (
    <Alert variant="subtle" alignItems="flex-start" maxW="5xl" status="success">
      <AlertIcon />
      <VStack gap={3}>
        <AlertTitle>Order completed</AlertTitle>
        <AlertDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          pariatur, ipsum similique veniam.
        </AlertDescription>
        <ButtonGroup gap="md">
          <Button colorScheme="success" variant="ghost">
            View Status
          </Button>
          <Button colorScheme="success" variant="ghost">
            Dismiss
          </Button>
        </ButtonGroup>
      </VStack>
    </Alert>
  )
}

export default WithActions
