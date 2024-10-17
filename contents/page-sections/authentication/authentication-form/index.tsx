import type { FC } from "react"
import { EyeIcon, EyeOffIcon } from "@yamada-ui/lucide"
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
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Spacer,
  Text,
  useBoolean,
  VStack,
} from "@yamada-ui/react"
import { GoogleButton } from "./google-button"
import { TwitterButton } from "./twitter-button"

const AuthenticationForm: FC = () => {
  const [show, { toggle }] = useBoolean()

  return (
    <Center bg={["blackAlpha.100", "blackAlpha.500"]} p="lg">
      <Card
        variant="outline"
        bg={["white", "black"]}
        maxW="lg"
        p="md"
        rounded="xl"
      >
        <CardHeader gap="0">
          <Heading as="h2" size="md">
            Welcome to Yamada UI, login with
          </Heading>
        </CardHeader>

        <CardBody>
          <ButtonGroup
            variant="outline"
            flexDir={{ base: "row", sm: "column" }}
            gap="md"
            w="full"
          >
            <GoogleButton
              borderColor={["blackAlpha.400", "whiteAlpha.400"]}
              rounded="full"
              w="full"
            >
              Google
            </GoogleButton>

            <TwitterButton
              borderColor={["blackAlpha.400", "whiteAlpha.400"]}
              rounded="full"
              w="full"
            >
              Twitter
            </TwitterButton>
          </ButtonGroup>

          <HStack w="full">
            <Divider />

            <Text
              color={["blackAlpha.700", "whiteAlpha.700"]}
              fontSize="sm"
              whiteSpace="nowrap"
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
          </VStack>
        </CardBody>

        <CardFooter
          flexDir={{ base: "row", sm: "column" }}
          pt={{ base: "md", sm: "xs" }}
        >
          <Link
            href="#"
            color={["blackAlpha.700", "whiteAlpha.700"]}
            fontSize="sm"
            textAlign="center"
            onClick={(e) => e.preventDefault()}
          >
            Don't have an account? Register
          </Link>
          <Spacer display={{ sm: "none" }} />
          <Button
            colorScheme="primary"
            px="lg"
            rounded="full"
            w={{ sm: "full" }}
          >
            Login
          </Button>
        </CardFooter>
      </Card>
    </Center>
  )
}

export default AuthenticationForm
