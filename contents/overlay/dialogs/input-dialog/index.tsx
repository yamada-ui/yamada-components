import type { FC } from "react"
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
import { useState } from "react"

const keyword = "delete"
const InputDialog: FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [monitoringInput, setMonitoringInput] = useState(true)
  const [text, setText] = useState<string>("")
  const handleOnClose = () => {
    onClose()
    setText("")
  }
  useUpdateEffect(() => {
    if (text === keyword) {
      setMonitoringInput(false)
    } else {
      setMonitoringInput(true)
    }
  }, [text])

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
          isDisabled: monitoringInput,
        }}
        onCancel={handleOnClose}
        onClose={handleOnClose}
        onSuccess={handleOnClose}
      >
        <DialogHeader>
          <VStack alignItems="center">
            <TriangleAlert boxSize="16" color="danger" />
            <Text>Are you sure?</Text>
          </VStack>
        </DialogHeader>
        <DialogBody overflow="visible">
          <VStack>
            <Text color={["blackAlpha.700", "whiteAlpha.700"]}>
              This action cannot be undone. If you really want to delete it,
              type '{keyword}'.
            </Text>
            <Input
              focusBorderColor={monitoringInput ? "danger.500" : "blue.500"}
              placeholder={keyword}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </VStack>
        </DialogBody>
      </Dialog>
    </>
  )
}

export default InputDialog
