import {
  Button,
  Container,
  Flex,
  FormControl,
  Heading,
  HStack,
  Input,
  Text,
  Textarea,
  VStack,
} from "@yamada-ui/react"
import type { FC } from "react"
import { contacts } from "./contacts"

const GetInTouch: FC = () => {
  return (
    <Container
      flexDir={{ base: "row", md: "column" }}
      bg={["whiteAlpha.500", "blackAlpha.500"]}
      maxW="5xl"
      rounded="2xl"
      gap={{ base: "xl", md: "lg" }}
      p={{ base: "lg", md: "xs" }}
    >
      <VStack
        bgGradient="linear(to-r, primary.700, primary.500)"
        py="xl"
        px="lg"
        rounded="2xl"
        color="white"
        w={{ base: "lg", md: "full" }}
        gap="xl"
      >
        <Heading as="h3" size="md">
          Contact information
        </Heading>
        <VStack>
          {contacts.map((contact) => (
            <HStack key={contact.name}>
              <contact.icon fontSize="xl" />
              <VStack gap="0">
                <Text fontSize="xs">{contact.name}</Text>
                <Text>{contact.value}</Text>
              </VStack>
            </HStack>
          ))}
        </VStack>
      </VStack>
      <VStack py={{ base: "xl", md: "sm" }} px="lg" as="form">
        <Heading as="h3" size="md">
          Get in touch
        </Heading>
        <Flex flexDir={{ base: "row", md: "column" }} gap="md">
          <FormControl label="Name">
            <Input type="text" placeholder="Hirotomo Yamada" />
          </FormControl>
          <FormControl label="Email" isRequired>
            <Input type="email" placeholder="your@email.com" />
          </FormControl>
        </Flex>
        <FormControl label="Subject" isRequired>
          <Input type="text" placeholder="Subject" />
        </FormControl>
        <FormControl label="Message">
          <Textarea placeholder="Please include all relevant information" />
        </FormControl>
        <Button colorScheme="primary" type="submit" placeSelf="flex-end">
          Send message
        </Button>
      </VStack>
    </Container>
  )
}

export default GetInTouch
