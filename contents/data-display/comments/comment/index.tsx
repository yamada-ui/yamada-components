import { Avatar, Box, Card, CardBody, Text, VStack } from "@yamada-ui/react"
import type { FC } from "react"

export const Comment: FC = () => {
  return (
    <Card variant="unstyled" maxW="md">
      <CardBody flexDir="row" placeItems="start">
        <Avatar src="https://avatars.githubusercontent.com/u/61367823?v=4" />
        <VStack gap="sm">
          <Box>
            <Text fontSize="sm">taroj1205</Text>
            <Text color="gray" fontSize="xs">
              10 minutes ago
            </Text>
          </Box>
          <Text fontSize="sm">
            This Pokémon likes to lick its palms that are sweetened by being
            soaked in honey. Teddiursa concocts its own honey by blending fruits
            and pollen collected by Beedrill. Blastoise has water spouts that
            protrude from its shell. The water spouts are very accurate.
          </Text>
        </VStack>
      </CardBody>
    </Card>
  )
}

export default Comment
