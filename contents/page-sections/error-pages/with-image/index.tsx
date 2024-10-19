import { Button, Flex, Heading, Image, Text, VStack } from "@yamada-ui/react"

const NotFoundImage = () => {
  return (
    <Flex
      alignItems="center"
      flexDir={{ base: "row", md: "column" }}
      justifyContent="center"
      p="lg"
    >
      <VStack maxW="lg" order={{ base: 1, md: 2 }}>
        <Heading size="xl" lineHeight="1" textAlign="center">
          Something is not right...
        </Heading>

        <Text color="gray" textAlign="center">
          Page you are trying to open does not exist. You may have mistyped the
          address, or the page has been moved to another URL. If you think this
          is an error contact support.
        </Text>

        <Button
          as="a"
          href="/"
          colorScheme="primary"
          variant="outline"
          mx="auto"
          w={{ base: "fit-content", md: "full" }}
          onClick={(e) => e.preventDefault()}
        >
          Get back to home page
        </Button>
      </VStack>

      <Image
        src="https://raw.githubusercontent.com/SAWARATSUKI/KawaiiLogos/main/ResponseCode/404%20NotFound.png"
        alt="404 Not Found (Image by Sawaratsuki)"
        order={{ base: 2, md: 1 }}
        w={{ base: "lg", md: "full" }}
      />
    </Flex>
  )
}

export default NotFoundImage
