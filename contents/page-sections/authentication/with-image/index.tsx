import {
  Button,
  Checkbox,
  Container,
  FormControl,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  VStack,
  useBoolean,
} from "@yamada-ui/react"
import { Eye, EyeOff } from "lucide-react"
import type { FC } from "react"

const AuthenticationForm: FC = () => {
  const [show, { toggle }] = useBoolean()

  return (
    <Container
      gap="sm"
      w="50%"
      _container={[{ maxW: "700px", css: { w: "full" } }]}
      bg={["white", "black"]}
    >
      <Heading as="h1" size="lg" textAlign="center">
        Welcome back to Yamada UI!
      </Heading>
      <VStack
        rounded="xl"
        w="lg"
        maxW="full"
        mx="auto"
        bg={["white", "black"]}
        p="md"
      >
        <FormControl label="Email">
          <Input type="email" placeholder="you@yamada-ui.com" />
        </FormControl>

        <FormControl label="Password">
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
                {show ? <Icon as={EyeOff} /> : <Icon as={Eye} />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Checkbox>Keep me logged in</Checkbox>

        <Button colorScheme="primary" w="full">
          Login
        </Button>
        <Text
          textAlign="center"
          fontSize="md"
          color={["blackAlpha.700", "whiteAlpha.700"]}
        >
          Don't have an account?{" "}
          <Link href="#" onClick={(e) => e.preventDefault()}>
            Register
          </Link>
        </Text>
      </VStack>
    </Container>
  )
}

export default AuthenticationForm
