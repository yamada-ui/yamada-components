import { PlusIcon } from "@yamada-ui/lucide"
import { HStack, Divider, Button, Heading } from "@yamada-ui/react"
import type { FC } from "react"

const WithTitleAndButton: FC = () => {
  return (
    <HStack w="full">
      <Heading as="h3" size="sm">
        Projects
      </Heading>

      <Divider />

      <Button
        leftIcon={<PlusIcon />}
        variant="outline"
        minW="fit-content"
        size="sm"
      >
        Button Text
      </Button>
    </HStack>
  )
}

export default WithTitleAndButton
