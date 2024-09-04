import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Container,
  Heading,
  Text,
  VStack,
} from "@yamada-ui/react"
import type { FC } from "react"

const HeroWithBackgroundImage: FC = () => {
  return (
    <Container
      bgImage="url(https://images.unsplash.com/photo-1573164713988-8665fc963095?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=980&q=80)"
      bgSize="cover"
      bgPosition="center"
      minH="fit-content"
      h="full"
    >
      <Box position="absolute" inset={0} zIndex="0" bg="blackAlpha.700" />
      <VStack
        as={Center}
        p={{ base: "lg", md: "md" }}
        h="full"
        zIndex="1"
        gap="lg"
      >
        <Heading
          as="h2"
          size="3xl"
          fontWeight={900}
          maxW="xl"
          color="white"
          lineHeight="1.2"
        >
          Automated AI code reviews for any stack
        </Heading>
        <Text fontSize="xl" maxW="xl" color="white">
          Build more reliable software with AI companion. AI is also trained to
          detect lazy developers who do nothing and just complain on Twitter.
        </Text>

        <ButtonGroup gap="md">
          <Button
            as="a"
            href="/getting-started"
            colorScheme="primary"
            rounded="full"
            onClick={(e) => e.preventDefault()}
          >
            Get started
          </Button>
          <Button
            as="a"
            href="https://yamada-ui.com"
            colorScheme="primary"
            variant="outline"
            rounded="full"
            onClick={(e) => e.preventDefault()}
          >
            Live demo
          </Button>
        </ButtonGroup>
      </VStack>
    </Container>
  )
}

export default HeroWithBackgroundImage
