import type { FC } from "react"
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

const ThreeButtonsDialog: FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const name = "Untitled-1"
  return (
    <>
      <Button onClick={onOpen}>Open Dialog</Button>
      <Dialog blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <DialogHeader>
          <CircleHelp boxSize="8" color="info" />
          <Text>Unsaved changes</Text>
        </DialogHeader>
        <Text color={["blackAlpha.700", "whiteAlpha.700"]}>
          Do you want to save changes to '{name}' before closing?
        </Text>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Spacer />
          <Button colorScheme="danger" variant="ghost" onClick={onClose}>
            Discard
          </Button>
          <Button colorScheme="info" variant="outline" onClick={onClose}>
            Save
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}
export default ThreeButtonsDialog
