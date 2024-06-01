import { HStack, Divider, Button, Icon } from "@yamada-ui/react"
import { Plus } from "lucide-react"
import type { FC } from "react"

const WithLabel: FC = () => {
  return (
    <HStack>
      <Divider />
      <Button
        leftIcon={<Icon as={Plus} />}
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

export default WithLabel
