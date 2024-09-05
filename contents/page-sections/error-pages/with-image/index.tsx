import { Button, Flex, Heading, Image, Text, VStack } from "@yamada-ui/react"

const NotFoundImage = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      p="lg"
      flexDir={{ base: "row", md: "column" }}
    >
      <VStack maxW="lg" order={{ base: 1, md: 2 }}>
        <Heading size="xl" textAlign="center" lineHeight="1">
          Something is not right...
        </Heading>

        <Text color="gray" textAlign="center">
          Page you are trying to open does not exist. You may have mistyped the
          address, or the page has been moved to another URL. If you think this
          is an error contact support.
        </Text>

        <Button
          as="a"
          w={{ base: "fit-content", md: "full" }}
          href="/"
          onClick={(e) => e.preventDefault()}
          variant="outline"
          colorScheme="primary"
          mx="auto"
        >
          Get back to home page
        </Button>
      </VStack>

      <Image
        alt="404 Not Found (Image by Sawaratsuki)"
        w={{ base: "lg", md: "full" }}
        order={{ base: 2, md: 1 }}
        src="https://raw.githubusercontent.com/SAWARATSUKI/KawaiiLogos/main/ResponseCode/404%20NotFound.png"
      />
    </Flex>
  )
}

export default NotFoundImage
