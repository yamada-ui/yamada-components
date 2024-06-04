import { Button, Flex, Heading, Image, Text, VStack } from "@yamada-ui/react"

const NotFoundImage = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      p="lg"
      _container={[{ maxW: "768px", css: { flexDir: "column" } }]}
    >
      <VStack
        maxW="lg"
        order={1}
        _container={[{ maxW: "768px", css: { order: 2 } }]}
      >
        <Heading as="h1" size="xl" textAlign="center">
          Something is not right...
        </Heading>

        <Text color="gray" textAlign="center">
          Page you are trying to open does not exist. You may have mistyped the
          address, or the page has been moved to another URL. If you think this
          is an error contact support.
        </Text>

        <Button
          as="a"
          w="fit-content"
          _container={[{ maxW: "768px", css: { w: "100%" } }]}
          href="/"
          onClick={(e) => e.preventDefault()}
          variant="outline"
          colorScheme="link"
          mx="auto"
        >
          Get back to home page
        </Button>
      </VStack>

      <Image
        alt="404 Not Found (Image by Sawaratsuki)"
        w="lg"
        order={2}
        _container={[{ maxW: "768px", css: { order: 1, w: "100%" } }]}
        src="https://raw.githubusercontent.com/SAWARATSUKI/KawaiiLogos/main/ResponseCode/404%20NotFound.png"
      />
    </Flex>
  )
}

export default NotFoundImage
