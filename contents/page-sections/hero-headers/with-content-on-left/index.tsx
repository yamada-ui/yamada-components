import type { FC } from "react"
import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Text,
  VStack,
} from "@yamada-ui/react"

const HeroWithContentOnLeft: FC = () => {
  return (
    <Container
      bgImage="url(https://images.unsplash.com/photo-1462899006636-339e08d1844e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)"
      bgPosition="center"
      bgSize="cover"
      h="full"
      minH="fit-content"
      position="relative"
    >
      <Box bg="blackAlpha.700" inset={0} position="absolute" zIndex="0" />
      <VStack as={Center} gap="lg" h="full" px="xl" py="xl" zIndex="1">
        <Heading
          as="h2"
          size="3xl"
          color="white"
          fontWeight={900}
          lineHeight="1.2"
          maxW="xl"
        >
          Unleash the Power of Styling, Animation, and Flexibility in React Apps
        </Heading>
        <Text color="white" fontSize="xl" maxW="xl">
          Yamada UI is a versatile React component library, unleashing the power
          of your application's animation and flexibility. It provides an
          intuitive and efficient way to integrate advanced styling into your
          application, bringing your ideas to life.
        </Text>

        <Button
          as="a"
          href="/getting-started"
          size="lg"
          bgGradient={[
            "linear(to-r, primary.700, primary.500)",
            "linear(to-r, primary.700, primary.500)",
          ]}
          color="white"
          rounded="full"
          w="fit-content"
          _hover={{
            bgGradient: [
              "linear(to-r, primary.600, primary.400)",
              "linear(to-r, primary.600, primary.300)",
            ],
          }}
          onClick={(e) => e.preventDefault()}
        >
          Get started
        </Button>
      </VStack>
    </Container>
  )
}

export default HeroWithContentOnLeft
