import { CircleHelp } from "@yamada-ui/lucide"
import {
  Button,
  Dialog,
  DialogFooter,
  DialogHeader,
  Spacer,
  Text,
  useDisclosure,
} from "@yamada-ui/react"
import type { FC } from "react"

const ThreeButtonsDialog: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const name = "Untitled-1"
  return (
    <>
      <Button onClick={onOpen}>Open Dialog</Button>
      <Dialog isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
        <DialogHeader>
          <CircleHelp boxSize="8" color="info" />
          <Text>Unsaved changes</Text>
        </DialogHeader>
        <Text color={["blackAlpha.700", "whiteAlpha.700"]}>
          Do you want to save changes to '{name}' before closing?
        </Text>
        <DialogFooter>
          <Button onClick={onClose} variant="ghost">
            Cancel
          </Button>
          <Spacer />
          <Button onClick={onClose} variant="ghost" colorScheme="danger">
            Discard
          </Button>
          <Button onClick={onClose} variant="outline" colorScheme="info">
            Save
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}
export default ThreeButtonsDialog
