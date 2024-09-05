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
import type { FC } from "react"
import HeroImage from "./hero.svg"

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
        src={HeroImage.src}
        alt="hero"
        maxW="md"
        display={{ lg: "none" }}
      />
    </Container>
  )
}

export default HeroWithBullets
