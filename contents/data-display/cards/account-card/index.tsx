import type { FC } from "react"
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
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from "@yamada-ui/react"

const AccountCard: FC = () => {
  return (
    <Card
      as="form"
      variant="outline"
      rounded="xl"
      w="md"
      onSubmit={(e) => e.preventDefault()}
    >
      <CardHeader alignItems="flex-start" flexDirection="column" gap="0">
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
          flexDir={{ sm: "column" }}
          gap="sm"
          w="full"
        >
          <Button leftIcon={<GithubIcon boxSize="1.25rem" />} w="full">
            GitHub
          </Button>

          <Button leftIcon={<TwitterIcon boxSize="1.25rem" />} w="full">
            Twitter
          </Button>
        </ButtonGroup>

        <HStack w="full">
          <Divider />

          <Text color="muted" fontSize="sm" whiteSpace="nowrap">
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
        <Button type="submit" colorScheme="primary" w="full">
          Create account
        </Button>
      </CardFooter>
    </Card>
  )
}

export default AccountCard
