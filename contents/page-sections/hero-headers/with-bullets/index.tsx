import type { FC } from "react"
import {
  Button,
  ButtonGroup,
  CheckIcon,
  Container,
  Heading,
  Image,
  List,
  ListIcon,
  ListItem,
  Text,
  VStack,
} from "@yamada-ui/react"

const HeroWithBullets: FC = () => {
  return (
    <Container flexDir="row">
      <VStack>
        <Heading as="h2" size="3xl" lineHeight="1.2">
          <Text as="span" color="primary">
            Unleash the Power
          </Text>{" "}
          of Styling, Animation, and Flexibility in React Apps
        </Heading>
        <Text color="muted">
          Yamada UI is a versatile React component library, unleashing the power
          of your application's animation and flexibility. It provides an
          intuitive and efficient way to integrate advanced styling into your
          application, bringing your ideas to life.
        </Text>
        <List>
          <ListItem>
            <ListIcon as={CheckIcon} color="primary" />
            <Text as="strong">TypeScript based</Text> - build type safe
            applications, all components and hooks export types
          </ListItem>
          <ListItem>
            <ListIcon as={CheckIcon} color="primary" />
            <Text as="strong">Free and open source</Text> - all packages have
            MIT license, you can use Mantine in any project
          </ListItem>
          <ListItem>
            <ListIcon as={CheckIcon} color="primary" />
            <Text as="strong">No annoying focus ring</Text> - focus ring will
            appear only when user navigates with keyboard
          </ListItem>
        </List>
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
            href="https://github.com/yamada-ui/yamada-ui"
            colorScheme="primary"
            variant="outline"
            rounded="full"
            onClick={(e) => e.preventDefault()}
          >
            Source code
          </Button>
        </ButtonGroup>
      </VStack>
      <Image
        src="https://images.unsplash.com/photo-1678690832324-67961a27ca92?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="hero"
        display={{ lg: "none" }}
        maxW="md"
      />
    </Container>
  )
}

export default HeroWithBullets
