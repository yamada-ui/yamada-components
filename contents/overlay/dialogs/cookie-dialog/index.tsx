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
        header="Cookie Consent"
        success="Accept"
        onSuccess={onClose}
        cancel="Decline"
        onCancel={onClose}
      >
        <Text>
          We use cookies to enhance your experience on our website. By clicking
          "Accept", you agree to our use of cookies for analytics and
          personalized content. For more information, please read our{" "}
          <Link href="./dialogs">Cookie Policy.</Link>
        </Text>
      </Dialog>
    </Center>
  )
}

export default CookieDialog
