import { Button, Heading, Text, VStack } from "@yamada-ui/react"

const ServerError = () => {
  return (
    <VStack
      alignItems="center"
      bg="primary"
      h="full"
      justifyContent="center"
      minH="3xl"
      px={{ base: "lg", md: "md" }}
    >
      <Heading
        as="h2"
        color="whiteAlpha.800"
        fontSize="9xl"
        fontWeight="bold"
        lineHeight="1"
      >
        500
      </Heading>

      <Heading
        as="h3"
        size="xl"
        color="white"
        lineHeight="1"
        textAlign="center"
      >
        Something bad just happened...
      </Heading>

      <Text color="white" textAlign="center">
        Our servers could not handle your request. Don't worry, our development
        team was already notified. Try refreshing the page.
      </Text>

      <Button
        as="a"
        href="/"
        bg="white"
        color="black"
        w="fit-content"
        _hover={{ bg: "gray.100" }}
        onClick={(e) => e.preventDefault()}
      >
        Refresh the page
      </Button>
    </VStack>
  )
}

export default ServerError
