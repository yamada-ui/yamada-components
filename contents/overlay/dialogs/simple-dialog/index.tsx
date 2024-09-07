import { Trash2 } from "@yamada-ui/lucide"
import {
  Button,
  Dialog,
  DialogHeader,
  Text,
  useDisclosure,
  VStack,
} from "@yamada-ui/react"
import type { FC } from "react"

const SimpleDialog: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}>Open Dialog</Button>
      <Dialog
        isOpen={isOpen}
        onClose={onClose}
        cancel="Cancel"
        onCancel={onClose}
        success={{
          colorScheme: "danger",
          children: "Delete",
        }}
        onSuccess={onClose}
        blockScrollOnMount={false}
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
