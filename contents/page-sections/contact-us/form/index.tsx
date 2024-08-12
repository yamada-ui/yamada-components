import { InstagramIcon, TwitterIcon, YoutubeIcon } from "@yamada-ui/lucide"
import {
  Button,
  ButtonGroup,
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
      flexDir={{ base: "row", md: "column" }}
      p="2xl"
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
              <contact.icon fontSize="xl" />
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
            onClick={e => e.preventDefault()}
          />
          <IconButton
            icon={<YoutubeIcon fontSize="2xl" color="white" />}
            rounded="full"
            as="a"
            href="https://youtube.com/hirotomoyamada"
            variant="ghost"
            onClick={e => e.preventDefault()}
          />
          <IconButton
            icon={<InstagramIcon fontSize="2xl" color="white" />}
            rounded="full"
            as="a"
            href="https://instagram.com/hirotomoyamada"
            variant="ghost"
            onClick={e => e.preventDefault()}
          />
        </ButtonGroup>
      </VStack>
      <VStack bg={["white", "black"]} as="form" rounded="md" p="lg">
        <FormControl label="Email" isRequired>
          <Input type="email" placeholder="your@email.com" />
        </FormControl>
        <FormControl label="Name">
          <Input type="text" placeholder="Hirotomo Yamada" />
        </FormControl>
        <FormControl label="Message" isRequired>
          <Textarea placeholder="Your message" />
        </FormControl>
        <Button colorScheme="primary" type="submit" placeSelf="flex-end">
          Send message
        </Button>
      </VStack>
    </Container>
  )
}

export default Form
