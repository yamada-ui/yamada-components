import { EyeIcon, EyeOffIcon } from "@yamada-ui/lucide"
import {
  Box,
  Button,
  Checkbox,
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
    <Box
      w="full"
      bgImg="url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80)"
    >
      <VStack
        p="lg"
        w="xl"
        _container={[{ maxW: "700px", css: { w: "full" } }]}
        bg={["white", "black"]}
        h="full"
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
                  {show ? <EyeOffIcon /> : <EyeIcon />}
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
      </VStack>
    </Box>
  )
}

export default AuthenticationForm
