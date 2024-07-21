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
  VStack,
  useBoolean,
} from "@yamada-ui/react"
import type { FC } from "react"

const AuthenticationForm: FC = () => {
  const [show, { toggle }] = useBoolean()

  return (
    <Center
      flexDirection="column"
      p="lg"
      bg={["blackAlpha.100", "blackAlpha.500"]}
      gap="lg"
    >
      <VStack gap="xs">
        <Heading as="h1" size="xl" textAlign="center">
          Welcome back!
        </Heading>
        <Text
          textAlign="center"
          fontSize="md"
          color={["blackAlpha.700", "whiteAlpha.700"]}
        >
          Do not have an account yet?{" "}
          <Link href="#" onClick={(e) => e.preventDefault()}>
            Create account
          </Link>
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
            <Input type="email" placeholder="you@yamada-ui.com" />
          </FormControl>

          <FormControl isRequired label="Password">
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Your password"
              />
              <InputRightElement isClick>
                <Button
                  h="1.75rem"
                  w="1.75rem"
                  minW="unset"
                  onClick={toggle}
                  variant="ghost"
                >
                  {show ? <EyeOffIcon /> : <EyeIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </CardBody>

        <CardFooter flexDir="column">
          <Flex
            flexDir={{ sm: "column", base: "row" }}
            gap={{ sm: "xs", base: undefined }}
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
