import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
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
              <contact.icon fontSize="2xl" />
              <VStack gap="0">
                <Text fontSize="xs">{contact.name}</Text>
                <Text>{contact.value}</Text>
              </VStack>
            </HStack>
          ))}
        </VStack>
      </VStack>
      <Card
        bg={["white", "black"]}
        as="form"
        rounded="md"
        p="md"
        w="full"
        maxW="xl"
        h="fit-content"
        boxShadow="none"
        onSubmit={(e) => e.preventDefault()}
      >
        <CardHeader flexDirection="column" alignItems="flex-start" gap="0">
          <Heading as="h2" size="lg">
            Get in touch
          </Heading>
        </CardHeader>
        <CardBody>
          <Flex flexDir={{ base: "row", md: "column" }} gap="md" w="full">
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
        </CardBody>
        <CardFooter
          justifyContent={{ base: "flex-end", md: "center" }}
          pt={{ sm: "xs", base: "md" }}
        >
          <Button colorScheme="primary" type="submit">
            Send message
          </Button>
        </CardFooter>
      </Card>
    </Container>
  )
}

export default GetInTouch
