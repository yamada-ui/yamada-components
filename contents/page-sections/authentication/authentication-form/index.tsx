import { Eye, EyeOff } from "@yamada-ui/lucide"
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Divider,
  FormControl,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Spacer,
  Text,
  VStack,
  useBoolean,
} from "@yamada-ui/react"
import type { FC } from "react"
import { GoogleButton } from "./google-button"
import { TwitterButton } from "./twitter-button"

const AuthenticationForm: FC = () => {
  const [show, { toggle }] = useBoolean()

  return (
    <Center p="lg" bg={["blackAlpha.100", "blackAlpha.500"]}>
      <Card
        rounded="xl"
        variant="outline"
        maxW="lg"
        bg={["white", "black"]}
        p="md"
      >
        <CardHeader flexDirection="column" alignItems="flex-start" gap="0">
          <Heading as="h2" size="md">
            Welcome to Yamada UI, login with
          </Heading>
        </CardHeader>

        <CardBody>
          <ButtonGroup
            variant="outline"
            gap="md"
            w="full"
            _container={[{ maxW: "400px", css: { flexDir: "column" } }]}
          >
            <GoogleButton
              w="full"
              rounded="full"
              borderColor={["blackAlpha.400", "whiteAlpha.400"]}
            >
              Google
            </GoogleButton>

            <TwitterButton
              w="full"
              rounded="full"
              borderColor={["blackAlpha.400", "whiteAlpha.400"]}
            >
              Twitter
            </TwitterButton>
          </ButtonGroup>

          <HStack w="full">
            <Divider />

            <Text
              whiteSpace="nowrap"
              fontSize="sm"
              color={["blackAlpha.700", "whiteAlpha.700"]}
            >
              Or continue with email
            </Text>

            <Divider />
          </HStack>

          <VStack w="full">
            <FormControl isRequired label="Email">
              <Input type="email" placeholder="hello@yamada-ui.com" />
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
                    {show ? <EyeOff /> : <Eye />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </VStack>
        </CardBody>

        <CardFooter
          pt="md"
          _container={[{ maxW: "400px", css: { flexDir: "column", pt: "xs" } }]}
        >
          <Link
            href="#"
            onClick={(e) => e.preventDefault()}
            fontSize="sm"
            color={["blackAlpha.700", "whiteAlpha.700"]}
            textAlign="center"
          >
            Don't have an account? Register
          </Link>
          <Spacer _container={[{ maxW: "400px", css: { display: "none" } }]} />
          <Button
            colorScheme="primary"
            rounded="full"
            px="lg"
            _container={[{ maxW: "400px", css: { w: "full" } }]}
          >
            Login
          </Button>
        </CardFooter>
      </Card>
    </Center>
  )
}

export default AuthenticationForm
