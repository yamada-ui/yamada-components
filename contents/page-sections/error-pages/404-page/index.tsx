import { Button, Heading, Text, VStack } from "@yamada-ui/react"

const NotFound = () => {
  return (
    <VStack alignItems="center" p="lg">
      <Heading as="h2" fontSize="9xl" fontWeight="bold" lineHeight="1">
        404
      </Heading>

      <Heading as="h3" size="xl" textAlign="center" lineHeight="1">
        You have found a secret place.
      </Heading>

      <Text textAlign="center" color="gray">
        Unfortunately, this is only a 404 page. You may have mistyped the
        address, or the page has been moved to another URL.
      </Text>

      <Button
        as="a"
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
