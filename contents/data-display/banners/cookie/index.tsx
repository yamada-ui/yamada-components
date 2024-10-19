import type { FC } from "react"
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CloseButton,
  HStack,
  Link,
  Text,
} from "@yamada-ui/react"

const CookieBanner: FC = () => {
  return (
    <Card variant="outline" maxW="md" shadow="sm">
      <CardHeader>
        <HStack justifyContent="space-between" w="full">
          <Text fontSize="md">Allow cookies</Text>
          <CloseButton size="sm" color="gray" />
        </HStack>
      </CardHeader>
      <CardBody>
        <Text color="gray" fontSize="xs">
          This website uses cookies to enhance user experience and to improve
          the website. By clicking "Accept all", you consent to the use of
          cookies. For more details, please refer to our{" "}
          <Link href="/privacy" onClick={(e) => e.preventDefault()}>
            Privacy Policy
          </Link>
        </Text>
      </CardBody>
      <CardFooter>
        <HStack gap="sm" justifyContent="end" w="full">
          <Button size="xs" variant="outline" h="10" px="4">
            Cookies preferences
          </Button>
          <Button colorScheme="sky" size="xs" variant="outline" h="10" px="4">
            Accept all
          </Button>
        </HStack>
      </CardFooter>
    </Card>
  )
}

export default CookieBanner
