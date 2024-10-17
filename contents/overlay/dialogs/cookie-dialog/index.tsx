import type { FC } from "react"
import { Button, Dialog, Link, Text, useDisclosure } from "@yamada-ui/react"

const CookieDialog: FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}>Open Dialog</Button>

      <Dialog
        blockScrollOnMount={false}
        cancel="Decline"
        header="Cookie Consent"
        isOpen={isOpen}
        success={{
          colorScheme: "info",
          children: "Accept",
        }}
        onCancel={onClose}
        onSuccess={onClose}
      >
        <Text color={["blackAlpha.700", "whiteAlpha.700"]}>
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
