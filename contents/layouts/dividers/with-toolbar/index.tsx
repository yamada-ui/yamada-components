import type { FC } from "react"
import {
  MessageSquareIcon,
  PaperclipIcon,
  PenIcon,
  Trash2Icon,
} from "@yamada-ui/lucide"
import { ButtonGroup, Divider, HStack, IconButton } from "@yamada-ui/react"

const WithToolbar: FC = () => {
  return (
    <HStack w="full">
      <Divider />

      <ButtonGroup isAttached>
        <IconButton variant="outline" icon={<PenIcon />} />
        <IconButton variant="outline" icon={<PaperclipIcon />} />
        <IconButton variant="outline" icon={<MessageSquareIcon />} />
        <IconButton variant="outline" icon={<Trash2Icon />} />
      </ButtonGroup>

      <Divider />
    </HStack>
  )
}

export default WithToolbar
