import { Button, Heading, Text, VStack } from "@yamada-ui/react"

const NotFound = () => {
  return (
    <VStack alignItems="center" p="lg">
      <Heading as="h2" fontSize="9xl" fontWeight="bold" lineHeight="1">
        404
      </Heading>

      <Heading as="h3" size="xl" lineHeight="1" textAlign="center">
        You have found a secret place.
      </Heading>

      <Text color="gray" textAlign="center">
        Unfortunately, this is only a 404 page. You may have mistyped the
        address, or the page has been moved to another URL.
      </Text>

      <Button
        as="a"
        href="/"
        colorScheme="link"
        variant="ghost"
        w="fit-content"
        onClick={(e) => e.preventDefault()}
      >
        Take me back to home page
      </Button>
    </VStack>
  )
}

export default NotFound
