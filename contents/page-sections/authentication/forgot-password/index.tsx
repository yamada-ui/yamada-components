import type { FC } from "react"
import { ArrowLeftIcon } from "@yamada-ui/lucide"
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  FormControl,
  Heading,
  Input,
  Link,
  Text,
  VStack,
} from "@yamada-ui/react"

const AuthenticationForm: FC = () => {
  return (
    <Center
      bg={["blackAlpha.100", "blackAlpha.500"]}
      flexDirection="column"
      gap="lg"
      p="lg"
    >
      <VStack gap="xs">
        <Heading as="h1" size="lg" textAlign="center">
          Forgot your password?
        </Heading>
        <Text
          color={["blackAlpha.700", "whiteAlpha.700"]}
          fontSize="md"
          textAlign="center"
        >
          Enter your email to get a reset link
        </Text>
      </VStack>
      <Card
        variant="outline"
        bg={["white", "black"]}
        maxW="full"
        mx="auto"
        p="md"
        rounded="xl"
        w="lg"
      >
        <CardBody>
          <FormControl isRequired label="Email">
            <Input type="email" placeholder="me@yamada-ui.com" />
          </FormControl>
        </CardBody>

        <CardFooter
          flexDir={{ base: "row", sm: "column" }}
          justifyContent="space-between"
        >
          <Link
            href="#"
            alignItems="center"
            color={["blackAlpha.700", "whiteAlpha.700"]}
            display="flex"
            fontSize="sm"
            justifyContent="center"
            onClick={(e) => e.preventDefault()}
          >
            <ArrowLeftIcon mr="xs" />
            Back to the login page
          </Link>
          <Button colorScheme="primary" w={{ sm: "full" }}>
            Reset password
          </Button>
        </CardFooter>
      </Card>
    </Center>
  )
}

export default AuthenticationForm
