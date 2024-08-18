import {
  Box,
  Card,
  CardBody,
  Grid,
  GridItem,
  Text,
  Button,
  CloseButton,
  HStack,
} from "@yamada-ui/react"
import type { FC } from "react"

const CookieBanner: FC = () => {
  return (
    <Card variant="outline" maxW="md" shadow="sm">
      <CardBody>
        <Grid
          templateAreas={`
            "title title close"
            "content content content"
            "empty button button"`}
          gap="sm"
        >
          <GridItem area="title">
            <Text fontSize="md">Allow cookies</Text>
          </GridItem>
          <GridItem area="close" ml="50%">
            <CloseButton size="sm" color="gray" />
          </GridItem>
          <GridItem area="content" minH="5xs">
            <Box
              dangerouslySetInnerHTML={{
                __html: `<p>This website uses cookies to enhance user experience and to improve the website. By clicking "Accept all", you consent to the use of cookies. For more details, please refer to our Privacy Policy.</p>`,
              }}
              onClick={(e) => e.preventDefault()}
              color="gray"
              fontSize="xs"
            />
          </GridItem>
          <GridItem area="button" ml="15%">
            <HStack gap="sm">
              <Button variant="outline" padding="4" size="xs">
                Cookies preferences
              </Button>
              <Button variant="outline" padding="4" colorScheme="sky" size="xs">
                Accept all
              </Button>
            </HStack>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  )
}

export default CookieBanner
