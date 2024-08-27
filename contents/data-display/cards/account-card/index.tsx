import { GithubIcon, TwitterIcon } from "@yamada-ui/lucide"
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  FormControl,
  HStack,
  Heading,
  Input,
  Text,
  VStack,
} from "@yamada-ui/react"
import type { FC } from "react"

const AccountCard: FC = () => {
  return (
    <Card
      rounded="xl"
      variant="outline"
      w="md"
      as="form"
      onSubmit={(e) => e.preventDefault()}
    >
      <CardHeader flexDirection="column" alignItems="flex-start" gap="0">
        <Heading as="h2" size="md">
          Create an account
        </Heading>

        <Text color="muted">
          Enter your email below to create your account.
        </Text>
      </CardHeader>

      <CardBody>
        <ButtonGroup
          variant="outline"
          gap="sm"
          w="full"
          flexDir={{ sm: "column" }}
        >
          <Button w="full" leftIcon={<GithubIcon boxSize="1.25rem" />}>
            GitHub
          </Button>

          <Button w="full" leftIcon={<TwitterIcon boxSize="1.25rem" />}>
            Twitter
          </Button>
        </ButtonGroup>

        <HStack w="full">
          <Divider />

          <Text whiteSpace="nowrap" fontSize="sm" color="muted">
            OR CONTINUE WITH
          </Text>

          <Divider />
        </HStack>

        <VStack w="full">
          <FormControl isRequired label="Email">
            <Input type="email" placeholder="your email address" />
          </FormControl>

          <FormControl isRequired label="Password">
            <Input type="password" placeholder="your password" />
          </FormControl>
        </VStack>
      </CardBody>

      <CardFooter>
        <Button type="submit" w="full" colorScheme="primary">
          Create account
        </Button>
      </CardFooter>
    </Card>
  )
}

export default AccountCard
