import { TriangleAlert } from "@yamada-ui/lucide"
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  Input,
  Text,
  useDisclosure,
  useUpdateEffect,
  VStack,
} from "@yamada-ui/react"
import { useState, type FC } from "react"

const InputDialog: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [monitoringInput, setMonitoringInput] = useState(true)
  const [text, setText] = useState<string>("")
  const handleOnClose = () => {
    onClose()
    setText("")
  }
  useUpdateEffect(() => {
    if (text === "delete") {
      setMonitoringInput(false)
    } else {
      setMonitoringInput(true)
    }
  }, [text])

  return (
    <>
      <Button onClick={onOpen}>Open Dialog</Button>
      <Dialog
        isOpen={isOpen}
        onClose={handleOnClose}
        cancel="Cancel"
        onCancel={handleOnClose}
        success={{
          colorScheme: "red",
          isDisabled: monitoringInput,
          children: "Delete",
        }}
        onSuccess={handleOnClose}
      >
        <DialogHeader>
          <VStack alignItems="center">
            <TriangleAlert boxSize="80px" color="red" />
            <Text>Are you sure?</Text>
          </VStack>
        </DialogHeader>
        <DialogBody>
          <VStack>
            <Text>
              This action cannot be undone. If you really want to delete it,
              type 'delete'.
            </Text>
            <Input
              value={text}
              placeholder="delete"
              focusBorderColor={monitoringInput ? "red.500" : "blue.500"}
              onChange={(e) => setText(e.target.value)}
            />
          </VStack>
        </DialogBody>
      </Dialog>
    </>
  )
}

export default InputDialog
