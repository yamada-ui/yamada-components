import { Button, Heading, Text, VStack } from "@yamada-ui/react"

const ServerError = () => {
  return (
    <VStack
      justifyContent="center"
      alignItems="center"
      bg="primary"
      px={{ base: "lg", md: "md" }}
      h="full"
      minH="3xl"
    >
      <Heading
        as="h2"
        fontSize="9xl"
        fontWeight="bold"
        color="whiteAlpha.800"
        lineHeight="1"
      >
        500
      </Heading>

      <Heading
        as="h3"
        size="xl"
        color="white"
        textAlign="center"
        lineHeight="1"
      >
        Something bad just happened...
      </Heading>

      <Text color="white" textAlign="center">
        Our servers could not handle your request. Don't worry, our development
        team was already notified. Try refreshing the page.
      </Text>

      <Button
        as="a"
        w="fit-content"
        href="/"
        color="black"
        bg="white"
        _hover={{ bg: "gray.100" }}
        onClick={(e) => e.preventDefault()}
      >
        Refresh the page
      </Button>
    </VStack>
  )
}

export default ServerError
