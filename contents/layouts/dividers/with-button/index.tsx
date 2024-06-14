import { Plus } from "@yamada-ui/lucide"
import { HStack, Divider, Button } from "@yamada-ui/react"
import type { FC } from "react"

const WithButton: FC = () => {
  return (
    <HStack w="full">
      <Divider />

      <Button
        leftIcon={<Plus />}
        variant="outline"
        minW="fit-content"
        size="sm"
      >
        Button Text
      </Button>
      <Divider />
    </HStack>
  )
}

export default WithButton
