import {
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Text,
  VStack,
} from "@yamada-ui/react"

const NotFoundImage = () => {
  return (
    <Flex
      flexDir={{ base: "row", lg: "column" }}
      alignItems="center"
      justifyContent="center"
    >
      <VStack maxW="lg" order={{ base: 1, lg: 2 }}>
        <Heading as="h1" size="xl" textAlign="center">
          Something is not right...
        </Heading>
        <Text color="gray" textAlign="center">
          Page you are trying to open does not exist. You may have mistyped the
          address, or the page has been moved to another URL. If you think this
          is an error contact support.
        </Text>
        <Button
          as={Link}
          w={{ base: "fit-content", lg: "100%" }}
          href="/"
          onClick={(e) => e.preventDefault()}
          variant="outline"
          colorScheme="link"
        >
          Get back to home page
        </Button>
      </VStack>
      <Image
        alt="404 Not Found (Image by Sawaratsuki)"
        w={{ base: "lg", lg: "full" }}
        order={{ base: 2, lg: 1 }}
        src="https://raw.githubusercontent.com/SAWARATSUKI/KawaiiLogos/main/ResponseCode/404%20NotFound.png"
      />
    </Flex>
  )
}

export default NotFoundImage
