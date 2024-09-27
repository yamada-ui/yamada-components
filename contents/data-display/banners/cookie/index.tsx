import {
  Card,
  CardBody,
  Text,
  Button,
  CloseButton,
  HStack,
  CardHeader,
  CardFooter,
} from "@yamada-ui/react"
import type { FC } from "react"

const CookieBanner: FC = () => {
  return (
    <Card variant="outline" maxW="md" shadow="sm">
      <CardHeader>
        <HStack w="full" justifyContent="space-between">
          <Text fontSize="md">Allow cookies</Text>
          <CloseButton size="sm" color="gray" />
        </HStack>
      </CardHeader>
      <CardBody>
        <Text color="gray" fontSize="xs">
          This website uses cookies to enhance user experience and to improve
          the website. By clicking "Accept all", you consent to the use of
          cookies. For more details, please refer to our Privacy Policy.
        </Text>
      </CardBody>
      <CardFooter>
        <HStack w="full" gap="sm" justifyContent="end">
          <Button variant="outline" padding="4" size="xs">
            Cookies preferences
          </Button>
          <Button variant="outline" padding="4" colorScheme="sky" size="xs">
            Accept all
          </Button>
        </HStack>
      </CardFooter>
    </Card>
  )
}

export default CookieBanner
