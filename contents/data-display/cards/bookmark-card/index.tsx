import type { FC } from "react"
import { BookmarkIcon } from "@yamada-ui/lucide"
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  IconButton,
  Image,
  Spacer,
  Text,
  VStack,
} from "@yamada-ui/react"

const BookmarkCard: FC = () => {
  return (
    <Card variant="outline" rounded="xl" w="md">
      <CardHeader>
        <VStack gap="xs">
          <Heading as="h2" size="md">
            Japan
          </Heading>

          <Text color="muted">Tokyo, Japan</Text>
        </VStack>

        <IconButton variant="ghost" icon={<BookmarkIcon fontSize="2xl" />} />
      </CardHeader>

      <CardBody>
        <Image
          src="https://images.pexels.com/photos/248195/pexels-photo-248195.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Japan"
          rounded="md"
          w="full"
        />
      </CardBody>

      <CardFooter flexDir={{ sm: "column" }}>
        <Text>Photo by Pixabay from Pexels</Text>

        <Spacer display={{ sm: "none" }} />

        <Button colorScheme="primary" w={{ sm: "full" }}>
          Explore
        </Button>
      </CardFooter>
    </Card>
  )
}

export default BookmarkCard
