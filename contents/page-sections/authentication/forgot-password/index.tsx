import { ArrowLeft } from "@yamada-ui/lucide"
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
  Spacer,
  Text,
  VStack,
} from "@yamada-ui/react"
import type { FC } from "react"

const AuthenticationForm: FC = () => {
  return (
    <Center
      flexDirection="column"
      p="lg"
      bg={["blackAlpha.100", "blackAlpha.500"]}
      gap="lg"
    >
      <VStack gap="xs">
        <Heading as="h1" size="lg" textAlign="center">
          Forgot your password?
        </Heading>
        <Text
          textAlign="center"
          fontSize="md"
          color={["blackAlpha.700", "whiteAlpha.700"]}
        >
          Enter your email to get a reset link
        </Text>
      </VStack>
      <Card
        rounded="xl"
        variant="outline"
        w="lg"
        maxW="full"
        mx="auto"
        bg={["white", "black"]}
        p="md"
      >
        <CardBody>
          <FormControl isRequired label="Email">
            <Input type="email" placeholder="me@yamada-ui.com" />
          </FormControl>
        </CardBody>

        <CardFooter
          _container={[{ maxW: "400px", css: { flexDir: "column" } }]}
        >
          <Link
            href="#"
            onClick={(e) => e.preventDefault()}
            fontSize="sm"
            color={["blackAlpha.700", "whiteAlpha.700"]}
            justifyContent="center"
            alignItems="center"
            display="flex"
            _hover={{ textDecoration: "none" }}
          >
            <ArrowLeft mr="xs" />
            Back to the login page
          </Link>
          <Spacer _container={[{ maxW: "400px", css: { display: "none" } }]} />
          <Button
            colorScheme="primary"
            _container={[{ maxW: "400px", css: { w: "full" } }]}
          >
            Reset password
          </Button>
        </CardFooter>
      </Card>
    </Center>
  )
}

export default AuthenticationForm
