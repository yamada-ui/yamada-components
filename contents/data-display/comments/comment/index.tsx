import { Avatar, Card, CardBody, GridItem, Grid, Text } from "@yamada-ui/react"
import type { FC } from "react"

export const Comment: FC = () => {
  return (
    <Card variant="unstyled" maxW="md">
      <CardBody>
        <Grid
          templateAreas={{
            base: `
                  "avatar user empty"
                  "avatar content content"
                `,
            sm: `
                  "avatar user empty"
                  "content content content"
                `,
          }}
          gap="sm"
          placeItems={{ base: "start", sm: "center" }}
        >
          <GridItem area="avatar" pr={{ base: "sm", sm: "xs" }}>
            <Avatar src="https://avatars.githubusercontent.com/u/61367823?v=4" />
          </GridItem>
          <GridItem area="user">
            <Text fontSize="sm">taroj1205</Text>
            <Text color="gray" fontSize="xs">
              10 minutes ago
            </Text>
          </GridItem>
          <GridItem area="content">
            <Text fontSize="sm">
              This Pokémon likes to lick its palms that are sweetened by being
              soaked in honey. Teddiursa concocts its own honey by blending
              fruits and pollen collected by Beedrill. Blastoise has water
              spouts that protrude from its shell. The water spouts are very
              accurate.
            </Text>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  )
}

export default Comment
