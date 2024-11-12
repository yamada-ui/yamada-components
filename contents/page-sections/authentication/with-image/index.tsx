import type { FC } from "react"
import { EyeIcon, EyeOffIcon } from "@yamada-ui/lucide"
import {
  Box,
  Button,
  Center,
  Checkbox,
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
    <Box
      bgImg="url(https://images.unsplash.com/photo-1677784976154-816c3ceca511?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)"
      h="full"
      w="full"
    >
      <Center
        bg={["white", "black"]}
        flexDir="column"
        h="full"
        p="lg"
        w={{ base: "xl", md: "full" }}
      >
        <Heading as="h1" size="lg" textAlign="center">
          Welcome back to Yamada UI!
        </Heading>

        <VStack
          bg={["white", "black"]}
          maxW="full"
          mx="auto"
          p="md"
          rounded="xl"
          w="lg"
        >
          <FormControl label="Email">
            <Input type="email" placeholder="you@yamada-ui.com" />
          </FormControl>

          <FormControl label="Password">
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

          <Checkbox>Keep me logged in</Checkbox>

          <Button colorScheme="primary" w="full">
            Login
          </Button>
          <Text
            color={["blackAlpha.700", "whiteAlpha.700"]}
            fontSize="md"
            textAlign="center"
          >
            Don't have an account?{" "}
            <Link href="#" onClick={(e) => e.preventDefault()}>
              Register
            </Link>
          </Text>
        </VStack>
      </Center>
    </Box>
  )
}

export default AuthenticationForm
