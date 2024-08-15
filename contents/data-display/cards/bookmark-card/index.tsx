import { BookmarkIcon } from "@yamada-ui/lucide"
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
  VStack,
  Spacer,
  IconButton,
  Image,
} from "@yamada-ui/react"
import type { FC } from "react"

const BookmarkCard: FC = () => {
  return (
    <Card w="md" rounded="xl" variant="outline">
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
          w="full"
          rounded="md"
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
