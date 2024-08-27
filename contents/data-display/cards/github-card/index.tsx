import { CircleIcon, StarIcon } from "@yamada-ui/lucide"
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Heading,
  Text,
  Center,
  CardBody,
  Spacer,
} from "@yamada-ui/react"
import type { FC } from "react"

const GitHubCard: FC = () => {
  return (
    <Card w="lg" rounded="xl" variant="outline">
      <CardHeader>
        <Heading as="h2" size="md" lineClamp={1}>
          yamada-ui
        </Heading>

        <Spacer />

        <Button colorScheme="primary" leftIcon={<StarIcon />}>
          Star
        </Button>
      </CardHeader>

      <CardBody>
        <Text color="muted">
          React UI components of the Yamada, by the Yamada, for the Yamada built
          with React and Emotion.
        </Text>
      </CardBody>

      <CardFooter
        flexDirection={{ base: "row", sm: "column" }}
        alignItems={{ base: "center", sm: "flex-start" }}
        gap={{ base: "md", sm: "sm" }}
      >
        <Text as={Center} gap="xs" color="muted">
          <CircleIcon /> TypeScript
        </Text>

        <Text as={Center} gap="xs" color="muted">
          <StarIcon /> 400
        </Text>

        <Text color="muted" lineClamp={1}>
          Updated 26 March 2024
        </Text>
      </CardFooter>
    </Card>
  )
}

export default GitHubCard
