import { Button, Heading, Link, Text, VStack } from "@yamada-ui/react"

const ServerError = () => {
  return (
    <VStack alignItems="center" maxW="2xl" mx="auto">
      <Text fontSize="9xl" fontWeight="bold" color="whiteAlpha.800">
        500
      </Text>
      <Heading as="h1" size="xl" color="white" textAlign="center">
        Something bad just happened...
      </Heading>
      <Text color="white" textAlign="center">
        Our servers could not handle your request. Don't worry, our development
        team was already notified. Try refreshing the page.
      </Text>
      <Button
        as={Link}
        w="fit-content"
        href="/"
        colorScheme="primary"
        onClick={(e) => e.preventDefault()}
      >
        Refresh the page
      </Button>
    </VStack>
  )
}

export default ServerError
