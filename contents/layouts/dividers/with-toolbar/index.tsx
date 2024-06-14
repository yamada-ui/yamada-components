import { MessageSquare, Paperclip, Pen, Trash2 } from "@yamada-ui/lucide"
import { HStack, Divider, ButtonGroup, IconButton } from "@yamada-ui/react"
import type { FC } from "react"

const WithToolbar: FC = () => {
  return (
    <HStack w="full">
      <Divider />

      <ButtonGroup isAttached>
        <IconButton icon={<Pen />} variant="outline" />
        <IconButton icon={<Paperclip />} variant="outline" />
        <IconButton icon={<MessageSquare />} variant="outline" />
        <IconButton icon={<Trash2 />} variant="outline" />
      </ButtonGroup>

      <Divider />
    </HStack>
  )
}

export default WithToolbar
