import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
  Switch,
} from "@yamada-ui/react"
import type { FC } from "react"

const CookieSettings: FC = () => {
  return (
    <Card w="xl" rounded="xl" variant="outline">
      <CardHeader flexDirection="column" alignItems="flex-start" gap="0">
        <Heading as="h2" size="md">
          Cookie Settings
        </Heading>
        <Text color="muted">Manage your cookie settings here.</Text>
      </CardHeader>

      <CardBody>
        <Switch defaultIsChecked isReverse>
          <Text>Strictly Necessary</Text>
          <Text color="muted">
            These cookies are essential in order to use the website and use its
            features.
          </Text>
        </Switch>

        <Switch isReverse>
          <Text>Functional Cookies</Text>
          <Text color="muted">
            These cookies allow the website to provide personalized
            functionality.
          </Text>
        </Switch>

        <Switch isReverse>
          <Text>Performance Cookies</Text>
          <Text color="muted">
            These cookies help to improve the performance of the website.
          </Text>
        </Switch>
      </CardBody>

      <CardFooter>
        <Button w="full" variant="outline" colorScheme="primary">
          Save Preferences
        </Button>
      </CardFooter>
    </Card>
  )
}

export default CookieSettings
