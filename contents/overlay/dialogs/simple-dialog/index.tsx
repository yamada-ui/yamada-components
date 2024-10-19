import type { FC } from "react"
import { Trash2 } from "@yamada-ui/lucide"
import {
  Button,
  Dialog,
  DialogHeader,
  Text,
  useDisclosure,
  VStack,
} from "@yamada-ui/react"

const SimpleDialog: FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}>Open Dialog</Button>
      <Dialog
        blockScrollOnMount={false}
        cancel="Cancel"
        isOpen={isOpen}
        success={{
          colorScheme: "danger",
          children: "Delete",
        }}
        onCancel={onClose}
        onClose={onClose}
        onSuccess={onClose}
      >
        <DialogHeader>
          <VStack alignItems="center">
            <Trash2 boxSize="16" color="danger" />
            <Text>Are you sure?</Text>
          </VStack>
        </DialogHeader>
        <Text color={["blackAlpha.700", "whiteAlpha.700"]}>
          This action cannot be undone. Are you sure you want to delete this
          item?
        </Text>
      </Dialog>
    </>
  )
}

export default SimpleDialog
