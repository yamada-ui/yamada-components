import { EyeIcon, EyeOffIcon } from "@yamada-ui/lucide"
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
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
  useNotice,
  VStack,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Container,
} from "@yamada-ui/react"
import { type FC, useState } from "react"
import type { FieldValues, SubmitHandler} from "react-hook-form";
import { useForm } from "react-hook-form"
import { GoogleButton } from "./google-button"
import { Hangman } from "./hang-man"
import { TwitterButton } from "./twitter-button"

const HangmanLogin: FC = () => {
  const [wrongAttempts, setWrongAttempts] = useState(0)
  const [show, setShow] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()
  const notice = useNotice({ limit: 1 })
  const { isOpen, onOpen, onClose } = useDisclosure()

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (data.password === "password123") {
      notice({
        title: "Login Successful",
        status: "success",
        duration: 3000,
        isClosable: true,
        placement: "bottom-left",
      })
    } else {
      const newAttempts = Math.min(wrongAttempts + 1, 6)
      setWrongAttempts(newAttempts)
      notice({
        title: "Incorrect Password",
        description: "Please try again",
        status: "error",
        duration: 3000,
        isClosable: true,
        placement: "bottom-left",
      })
      if (newAttempts === 6) {
        onOpen()
      }
    }
  }

  const resetGame = () => {
    setWrongAttempts(0)
    reset()
    onClose()
  }

  const toggle = () => setShow(!show)

  return (
    <Container position="relative" maxW="xl">
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
            flexDir={{ sm: "column", base: "row" }}
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

          <VStack w="full" as="form" onSubmit={handleSubmit(onSubmit)}>
            <FormControl isRequired isInvalid={!!errors.email} label="Email">
              <Input
                type="email"
                placeholder="hello@yamada-ui.com"
                isDisabled={wrongAttempts === 6}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              <Text color="red.500">{errors.email?.message?.toString()}</Text>
            </FormControl>

            <FormControl
              isRequired
              isInvalid={!!errors.password}
              label="Password"
            >
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Your password"
                  isDisabled={wrongAttempts === 6}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <InputRightElement>
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
              <Text color="red.500">
                {errors.password?.message?.toString()}
              </Text>
            </FormControl>

            <Button
              type="submit"
              colorScheme="primary"
              rounded="full"
              px="lg"
              w={{ sm: "full" }}
              isDisabled={wrongAttempts === 6}
            >
              Login
            </Button>
          </VStack>
        </CardBody>

        <CardFooter
          flexDir={{ sm: "column", base: "row" }}
          pt={{ sm: "xs", base: "md" }}
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
          <Spacer display={{ sm: "none" }} />
        </CardFooter>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalHeader>Game Over</ModalHeader>
        <ModalBody>
          <Text>
            Oh no! The hangman is complete. You've run out of attempts to log
            in.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={resetGame}>
            Try Again
          </Button>
        </ModalFooter>
      </Modal>

      <Hangman wrongAttempts={wrongAttempts} />
    </Container>
  )
}

export default HangmanLogin
