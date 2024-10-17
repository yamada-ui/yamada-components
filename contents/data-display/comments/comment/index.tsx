import type { FC } from "react"
import { Avatar, Card, CardBody, Grid, GridItem, Text } from "@yamada-ui/react"

export const Comment: FC = () => {
  return (
    <Card variant="unstyled" maxW="md">
      <CardBody>
        <Grid
          gap="sm"
          placeItems={{ base: "start", sm: "center" }}
          templateAreas={{
            base: `"avatar user empty" "avatar content content"`,
            sm: `"avatar user empty" "content content content"`,
          }}
        >
          <GridItem area="avatar" pr={{ base: "sm", sm: "xs" }}>
            <Avatar src="https://avatars.githubusercontent.com/u/61367823?v=4" />
          </GridItem>
          <GridItem area="user">
            <Text lineClamp={1}>taroj1205</Text>
            <Text color="muted" lineClamp={1}>
              10 minutes ago
            </Text>
          </GridItem>
          <GridItem area="content">
            <Text>
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
