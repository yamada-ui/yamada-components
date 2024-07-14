import { Button, Dialog, Link, Text, useDisclosure } from "@yamada-ui/react"
import type { FC } from "react"

const CookieDialog: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}>Open Dialog</Button>

      <Dialog
        isOpen={isOpen}
        header="Cookie Consent"
        cancel="Decline"
        onCancel={onClose}
        success="Accept"
        onSuccess={onClose}
        blockScrollOnMount={false}
      >
        <Text>
          We use cookies to enhance your experience on our website. By clicking
          "Accept", you agree to our use of cookies for analytics and
          personalized content. For more information, please read our{" "}
          <Link href="/privacy/cookie" onClick={(e) => e.preventDefault()}>
            Cookie Policy.
          </Link>
        </Text>
      </Dialog>
    </>
  )
}

export default CookieDialog
