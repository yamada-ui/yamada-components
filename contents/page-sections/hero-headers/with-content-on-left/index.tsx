import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Text,
  VStack,
} from "@yamada-ui/react"
import type { FC } from "react"

const HeroWithBullets: FC = () => {
  return (
    <Container
      bgImage="url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)"
      bgSize="cover"
      bgPosition="center"
      minH="fit-content"
      h="full"
    >
      <Box position="absolute" inset={0} zIndex="0" bg="blackAlpha.700" />
      <VStack as={Center} px="xl" h="full" zIndex="1" py="xl" gap="lg">
        <Heading as="h2" size="3xl" fontWeight={900} maxW="xl">
          Unleash the Power of Styling, Animation, and Flexibility in React Apps
        </Heading>
        <Text fontSize="xl" maxW="xl">
          Yamada UI is a versatile React component library, unleashing the power
          of your application's animation and flexibility. It provides an
          intuitive and efficient way to integrate advanced styling into your
          application, bringing your ideas to life.
        </Text>

        <Button
          as="a"
          href="/getting-started"
          bgGradient={[
            "linear(to-r, primary.700, primary.400)",
            "linear(to-r, primary.700, primary.400)",
          ]}
          _hover={{
            bgGradient: [
              "linear(to-r, primary.600, primary.300)",
              "linear(to-r, primary.600, primary.300)",
            ],
          }}
          rounded="full"
          w="fit-content"
          size="lg"
          onClick={(e) => e.preventDefault()}
        >
          Get started
        </Button>
      </VStack>
    </Container>
  )
}

export default HeroWithBullets
