import type { FC } from "react"
import { InstagramIcon, TwitterIcon, YoutubeIcon } from "@yamada-ui/lucide"
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Center,
  Container,
  FormControl,
  Heading,
  HStack,
  IconButton,
  Input,
  Text,
  Textarea,
  VStack,
} from "@yamada-ui/react"
import { contacts } from "./contacts"

const Form: FC = () => {
  return (
    <Container
      bgGradient="linear(to-r, primary.700, primary.500)"
      centerContent
      h="fit-content"
      minH="full"
      p="0"
      w="full"
    >
      <Center
        flexDir={{ base: "row", lg: "column" }}
        gap="md"
        justifyContent={{ base: "space-between", lg: "center" }}
        maxW="9xl"
        p={{ base: "2xl", sm: "md", lg: "lg" }}
        w="full"
      >
        <VStack color="white" gap="sm" maxW={{ lg: "xl" }} w="full">
          <Heading as="h2" size="lg">
            Contact us
          </Heading>
          <Text>
            Leave your email and we will get back to you within 24 hours
          </Text>
          <VStack my="md" w="full">
            {contacts.map((contact) => (
              <HStack key={contact.name} w="full">
                <contact.icon fontSize="2xl" />
                <VStack align="start" gap="0">
                  <Text fontSize="xs">{contact.name}</Text>
                  <Text>{contact.value}</Text>
                </VStack>
              </HStack>
            ))}
          </VStack>
          <ButtonGroup>
            <IconButton
              as="a"
              href="https://twitter.com/hirotomoyamada"
              variant="ghost"
              icon={<TwitterIcon color="white" fontSize="2xl" />}
              rounded="full"
              _hover={{ bg: "blackAlpha.200" }}
              onClick={(e) => e.preventDefault()}
            />
            <IconButton
              as="a"
              href="https://youtube.com/hirotomoyamada"
              variant="ghost"
              icon={<YoutubeIcon color="white" fontSize="2xl" />}
              rounded="full"
              _hover={{ bg: "blackAlpha.200" }}
              onClick={(e) => e.preventDefault()}
            />
            <IconButton
              as="a"
              href="https://instagram.com/hirotomoyamada"
              variant="ghost"
              icon={<InstagramIcon color="white" fontSize="2xl" />}
              rounded="full"
              _hover={{ bg: "blackAlpha.200" }}
              onClick={(e) => e.preventDefault()}
            />
          </ButtonGroup>
        </VStack>
        <Card
          as="form"
          bg={["white", "black"]}
          h="fit-content"
          maxW="xl"
          mx="auto"
          p={{ base: "md", lg: "sm" }}
          placeSelf={{ lg: "flex-start" }}
          rounded="md"
          w="full"
          onSubmit={(e) => e.preventDefault()}
        >
          <CardBody>
            <FormControl isRequired label="Email">
              <Input type="email" placeholder="your@email.com" />
            </FormControl>
            <FormControl label="Name">
              <Input type="text" placeholder="Hirotomo Yamada" />
            </FormControl>
            <FormControl isRequired label="Message">
              <Textarea placeholder="Your message" />
            </FormControl>
          </CardBody>
          <CardFooter justifyContent={{ base: "flex-end", md: "center" }}>
            <Button type="submit" colorScheme="primary">
              Send message
            </Button>
          </CardFooter>
        </Card>
      </Center>
    </Container>
  )
}

export default Form
