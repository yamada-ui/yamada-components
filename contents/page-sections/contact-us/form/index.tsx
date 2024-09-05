import { InstagramIcon, TwitterIcon, YoutubeIcon } from "@yamada-ui/lucide"
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
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
import type { FC } from "react"
import { contacts } from "./contacts"

const Form: FC = () => {
  return (
    <Container
      bgGradient="linear(to-r, primary.700, primary.500)"
      h="full"
      flexDir={{ base: "row", lg: "column" }}
      p={{ base: "2xl", sm: "md", lg: "lg" }}
      centerContent
    >
      <VStack gap="sm" color="white">
        <Heading as="h2" size="lg">
          Contact us
        </Heading>
        <Text>
          Leave your email and we will get back to you within 24 hours
        </Text>
        <VStack my="md">
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
        <ButtonGroup>
          <IconButton
            icon={<TwitterIcon fontSize="2xl" color="white" />}
            rounded="full"
            as="a"
            href="https://twitter.com/hirotomoyamada"
            variant="ghost"
            colorScheme="whiteAlpha"
            onClick={(e) => e.preventDefault()}
          />
          <IconButton
            icon={<YoutubeIcon fontSize="2xl" color="white" />}
            rounded="full"
            as="a"
            href="https://youtube.com/hirotomoyamada"
            variant="ghost"
            colorScheme="whiteAlpha"
            onClick={(e) => e.preventDefault()}
          />
          <IconButton
            icon={<InstagramIcon fontSize="2xl" color="white" />}
            rounded="full"
            as="a"
            href="https://instagram.com/hirotomoyamada"
            variant="ghost"
            colorScheme="whiteAlpha"
            onClick={(e) => e.preventDefault()}
          />
        </ButtonGroup>
      </VStack>
      <Card
        bg={["white", "black"]}
        as="form"
        rounded="md"
        p="md"
        minW="xl"
        h="fit-content"
        placeSelf={{ lg: "flex-start" }}
        onSubmit={(e) => e.preventDefault()}
      >
        <CardBody>
          <FormControl label="Email" isRequired>
            <Input type="email" placeholder="your@email.com" />
          </FormControl>
          <FormControl label="Name">
            <Input type="text" placeholder="Hirotomo Yamada" />
          </FormControl>
          <FormControl label="Message" isRequired>
            <Textarea placeholder="Your message" />
          </FormControl>
        </CardBody>
        <CardFooter justifyContent="flex-end" pt={{ sm: "xs", base: "md" }}>
          <Button colorScheme="primary" type="submit">
            Send message
          </Button>
        </CardFooter>
      </Card>
    </Container>
  )
}

export default Form
