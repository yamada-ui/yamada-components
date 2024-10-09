import type { FC } from "react"
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  HStack,
  Text,
  VStack,
} from "@yamada-ui/react"

const ShareDocument: FC = () => {
  return (
    <Card variant="outline" rounded="xl" w="md">
      <CardHeader
        alignItems={{ base: "center", sm: "flex-start" }}
        flexDirection={{ base: "row", sm: "column" }}
      >
        <HStack flex="1">
          <Avatar src="https://avatars.githubusercontent.com/u/61367823?v=4" />

          <VStack gap={0}>
            <Text as="h2" fontWeight="semibold" lineClamp={1}>
              Shintaro Jokagi
            </Text>
            <Text color="muted" lineClamp={1}>
              @taroj1205
            </Text>
          </VStack>
        </HStack>

        <Button
          colorScheme="primary"
          size="sm"
          isRounded
          px="normal"
          w={{ sm: "full" }}
        >
          Follow
        </Button>
      </CardHeader>

      <CardBody>
        <Text color="muted">
          Passionate about web development and a student at the University of
          Auckland.
        </Text>
      </CardBody>

      <CardFooter>
        <Text color="muted">
          <Text as="span" fontWeight="semibold" me="xs">
            200
          </Text>
          Following
        </Text>

        <Text color="muted">
          <Text as="span" fontWeight="semibold" me="xs">
            6000
          </Text>
          Followers
        </Text>
      </CardFooter>
    </Card>
  )
}

export default ShareDocument
