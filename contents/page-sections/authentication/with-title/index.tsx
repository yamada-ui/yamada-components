import type { FC } from "react"
import { EyeIcon, EyeOffIcon } from "@yamada-ui/lucide"
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Checkbox,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  useBoolean,
  VStack,
} from "@yamada-ui/react"

const AuthenticationForm: FC = () => {
  const [show, { toggle }] = useBoolean()

  return (
    <Center
      bg={["blackAlpha.100", "blackAlpha.500"]}
      flexDirection="column"
      gap="lg"
      p="lg"
    >
      <VStack gap="xs">
        <Heading as="h1" size="xl" textAlign="center">
          Welcome back!
        </Heading>
        <Text
          color={["blackAlpha.700", "whiteAlpha.700"]}
          fontSize="md"
          textAlign="center"
        >
          Do not have an account yet?{" "}
          <Link href="#" onClick={(e) => e.preventDefault()}>
            Create account
          </Link>
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
            <Input type="email" placeholder="you@yamada-ui.com" />
          </FormControl>

          <FormControl isRequired label="Password">
            <InputGroup size="md">
              <Input
                type={show ? "text" : "password"}
                placeholder="Your password"
                pr="4.5rem"
              />
              <InputRightElement isClick>
                <Button
                  variant="ghost"
                  h="1.75rem"
                  minW="unset"
                  w="1.75rem"
                  onClick={toggle}
                >
                  {show ? <EyeOffIcon /> : <EyeIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </CardBody>

        <CardFooter flexDir="column">
          <Flex
            flexDir={{ base: "row", sm: "column" }}
            gap={{ base: undefined, sm: "xs" }}
            justifyContent="space-between"
            w="full"
          >
            <Checkbox>Remember me</Checkbox>
            <Link href="#" onClick={(e) => e.preventDefault()}>
              Forgot password?
            </Link>
          </Flex>
          <Button colorScheme="primary" w="full">
            Sign in
          </Button>
        </CardFooter>
      </Card>
    </Center>
  )
}

export default AuthenticationForm
