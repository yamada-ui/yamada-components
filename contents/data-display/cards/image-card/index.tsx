import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Heading,
  Text,
  Spacer,
  Tag,
} from "@yamada-ui/react"
import type { FC } from "react"

const ImageCard: FC = () => {
  return (
    <Card
      maxW="xl"
      rounded="xl"
      variant="outline"
      h="sm"
      bgImage="https://picsum.photos/400?grayscale"
      bgSize="cover"
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
        roundedBottom="xl"
        pt={4}
      >
        <Text color="white">Captured on 26 March 2024</Text>

        <Spacer />

        <Button colorScheme="primary">Continue</Button>
      </CardFooter>
    </Card>
  )
}

export default ImageCard
