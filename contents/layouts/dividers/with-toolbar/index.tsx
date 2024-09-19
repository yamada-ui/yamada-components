import {
  MessageSquareIcon,
  PaperclipIcon,
  PenIcon,
  Trash2Icon,
} from "@yamada-ui/lucide"
import { HStack, Divider, ButtonGroup, IconButton } from "@yamada-ui/react"
import type { FC } from "react"

const WithToolbar: FC = () => {
  return (
    <HStack w="full">
      <Divider />

      <ButtonGroup isAttached>
        <IconButton icon={<PenIcon />} variant="outline" />
        <IconButton icon={<PaperclipIcon />} variant="outline" />
        <IconButton icon={<MessageSquareIcon />} variant="outline" />
        <IconButton icon={<Trash2Icon />} variant="outline" />
      </ButtonGroup>

      <Divider />
    </HStack>
  )
}

export default WithToolbar
