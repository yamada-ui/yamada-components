import type { FC } from "react"
import { PlusIcon } from "@yamada-ui/lucide"
import { Button, Divider, HStack } from "@yamada-ui/react"

const WithButton: FC = () => {
  return (
    <HStack w="full">
      <Divider />

      <Button
        size="sm"
        variant="outline"
        leftIcon={<PlusIcon />}
        minW="fit-content"
      >
        Button Text
      </Button>
      <Divider />
    </HStack>
  )
}

export default WithButton
