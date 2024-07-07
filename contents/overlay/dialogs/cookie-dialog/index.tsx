import {
  Button,
  Center,
  Dialog,
  Link,
  Text,
  useDisclosure,
} from "@yamada-ui/react"
import type { FC } from "react"

const CookieDialog: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Center>
      <Button onClick={onOpen} m="50px">
        Open Dialog
      </Button>

      <Dialog
        isOpen={isOpen}
        header="About cookies"
        success="I agree"
        onSuccess={onClose}
        cancel="I disagree"
        onCancel={onClose}
      >
        <Text>
          We use cookies to improve your experience. Click "I agree" to accept
          or "I disagree" to decline. You can also manage settings in your
          browser.
        </Text>
        <Link href="./dialogs">Privacy Policy</Link>
      </Dialog>
    </Center>
  )
}

export default CookieDialog
