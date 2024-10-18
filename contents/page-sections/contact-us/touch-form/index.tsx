import type { FC } from "react"
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
import { contacts } from "./contacts"

const GetInTouch: FC = () => {
  return (
    <Container
      flexDir={{ base: "row", md: "column" }}
      gap={{ base: "xl", md: "lg" }}
      m="auto"
      maxW="5xl"
      p={{ base: "lg", md: "xs" }}
      rounded="2xl"
    >
      <VStack
        bgGradient="linear(to-r, primary.700, primary.500)"
        color="white"
        gap="xl"
        px="lg"
        py="xl"
        rounded="2xl"
        w={{ base: "lg", md: "full" }}
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
        as="form"
        bg={["white", "black"]}
        boxShadow="none"
        h="fit-content"
        maxW="xl"
        p="md"
        rounded="md"
        w="full"
        onSubmit={(e) => e.preventDefault()}
      >
        <CardHeader alignItems="flex-start" flexDirection="column" gap="0">
          <Heading as="h2" size="lg">
            Get in touch
          </Heading>
        </CardHeader>
        <CardBody>
          <Flex flexDir={{ base: "row", md: "column" }} gap="md" w="full">
            <FormControl label="Name">
              <Input type="text" placeholder="Hirotomo Yamada" />
            </FormControl>
            <FormControl isRequired label="Email">
              <Input type="email" placeholder="your@email.com" />
            </FormControl>
          </Flex>
          <FormControl isRequired label="Subject">
            <Input type="text" placeholder="Subject" />
          </FormControl>
          <FormControl label="Message">
            <Textarea placeholder="Please include all relevant information" />
          </FormControl>
        </CardBody>
        <CardFooter
          justifyContent={{ base: "flex-end", md: "center" }}
          pt={{ base: "md", sm: "xs" }}
        >
          <Button type="submit" colorScheme="primary">
            Send message
          </Button>
        </CardFooter>
      </Card>
    </Container>
  )
}

export default GetInTouch
