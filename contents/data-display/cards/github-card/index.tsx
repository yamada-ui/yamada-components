import type { FC } from "react"
import { CircleIcon, StarIcon } from "@yamada-ui/lucide"
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Heading,
  Spacer,
  Text,
} from "@yamada-ui/react"

const GitHubCard: FC = () => {
  return (
    <Card variant="outline" rounded="xl" w="lg">
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
        alignItems={{ base: "center", sm: "flex-start" }}
        flexDirection={{ base: "row", sm: "column" }}
        gap={{ base: "md", sm: "sm" }}
      >
        <Text as={Center} color="muted" gap="xs">
          <CircleIcon /> TypeScript
        </Text>

        <Text as={Center} color="muted" gap="xs">
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
