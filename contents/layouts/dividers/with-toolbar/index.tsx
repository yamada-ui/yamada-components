import {
  HStack,
  Divider,
  Icon,
  ButtonGroup,
  IconButton,
} from "@yamada-ui/react"
import { MessageSquare, Paperclip, Pen, Trash2 } from "lucide-react"
import type { FC } from "react"

const WithToolbar: FC = () => {
  return (
    <HStack>
      <Divider />
      <ButtonGroup isAttached>
        <IconButton icon={<Icon as={Pen} />} variant="outline" />
        <IconButton icon={<Icon as={Paperclip} />} variant="outline" />
        <IconButton icon={<Icon as={MessageSquare} />} variant="outline" />
        <IconButton icon={<Icon as={Trash2} />} variant="outline" />
      </ButtonGroup>
      <Divider />
    </HStack>
  )
}

export default WithToolbar
