import { HStack, Divider, Button, Icon, Heading } from "@yamada-ui/react"
import { Plus } from "lucide-react"
import type { FC } from "react"

const WithLabel: FC = () => {
  return (
    <HStack>
      <Heading as="h3" size="sm">
        Projects
      </Heading>
      <Divider />
      <Button
        leftIcon={<Icon as={Plus} />}
        variant="outline"
        minW="fit-content"
        size="sm"
      >
        Button Text
      </Button>
    </HStack>
  )
}

export default WithLabel
