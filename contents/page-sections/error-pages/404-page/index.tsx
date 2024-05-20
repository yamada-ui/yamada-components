import { Button, Heading, Link, Text, VStack } from "@yamada-ui/react"

const NotFound = () => {
  return (
    <VStack alignItems="center">
      <Text fontSize="5xl" fontWeight="bold">
        404
      </Text>
      <Heading as="h1" size="xl" textAlign="center">
        You have found a secret place.
      </Heading>
      <Text textAlign="center" color="gray">
        Unfortunately, this is only a 404 page. You may have mistyped the
        address, or the page has been moved to another URL.
      </Text>
      <Button
        as={Link}
        w="fit-content"
        href="/"
        onClick={(e) => e.preventDefault()}
        variant="ghost"
        colorScheme="link"
      >
        Take me back to home page
      </Button>
    </VStack>
  )
}

export default NotFound
