import type { FC } from "react"
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Heading,
  Spacer,
  Tag,
  Text,
} from "@yamada-ui/react"

const ImageCard: FC = () => {
  return (
    <Card
      variant="outline"
      bgImage="https://picsum.photos/400?grayscale"
      bgSize="cover"
      h="sm"
      maxW="xl"
      rounded="xl"
    >
      <CardHeader>
        <Tag>New</Tag>
      </CardHeader>

      <CardBody>
        <Heading as="h2" size="lg">
          Example
        </Heading>
      </CardBody>

      <Divider />

      <CardFooter
        backdropFilter="blur(10px)"
        bg="blackAlpha.500"
        pt={4}
        roundedBottom="xl"
      >
        <Text color="white">Captured on 26 March 2024</Text>

        <Spacer />

        <Button colorScheme="primary">Continue</Button>
      </CardFooter>
    </Card>
  )
}

export default ImageCard
