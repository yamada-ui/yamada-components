import { BellIcon, EyeOffIcon, UserIcon } from "@yamada-ui/lucide"
import {
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Text,
  VStack,
} from "@yamada-ui/react"
import type { FC } from "react"

const NotificationsCard: FC = () => {
  return (
    <Card maxW="xl" rounded="xl" variant="outline">
      <CardHeader flexDirection="column" alignItems="flex-start" gap="0">
        <Heading size="md">Notifications</Heading>

        <Text color="muted">Choose what you want to be notified about.</Text>
      </CardHeader>

      <CardBody>
        <VStack gap="sm">
          <HStack
            cursor="pointer"
            _hover={{ bg: ["blackAlpha.50", "whiteAlpha.50"] }}
            w="full"
            rounded="md"
            p="md"
          >
            <BellIcon fontSize="2xl" />

            <VStack gap="xs">
              <Text>Everything</Text>
              <Text color="muted">Email digest, mentions & all activity.</Text>
            </VStack>
          </HStack>

          <HStack
            cursor="pointer"
            bg={["blackAlpha.50", "whiteAlpha.50"]}
            w="full"
            rounded="md"
            p="md"
          >
            <UserIcon fontSize="2xl" />

            <VStack gap="xs">
              <Text>Available</Text>
              <Text color="muted">Only mentions and comments.</Text>
            </VStack>
          </HStack>

          <HStack
            cursor="pointer"
            _hover={{ bg: ["blackAlpha.50", "whiteAlpha.50"] }}
            w="full"
            rounded="md"
            p="md"
          >
            <EyeOffIcon fontSize="2xl" />

            <VStack gap="xs">
              <Text>Ignoring</Text>
              <Text color="muted">Turn off all notifications.</Text>
            </VStack>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  )
}

export default NotificationsCard
