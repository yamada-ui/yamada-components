import { Check, Copy } from "@yamada-ui/lucide"
import { Button, Icon, Tooltip, useClipboard } from "@yamada-ui/react"
import type { FC } from "react"

const CopyButton: FC = () => {
  const { onCopy, hasCopied } = useClipboard("https://yamada-ui.com/")

  return (
    <Tooltip label="Link copied!" bg="success" color="white" isOpen={hasCopied}>
      <Button
        onClick={onCopy}
        rightIcon={
          hasCopied ? (
            <Icon as={Check} fontSize="1.25em" />
          ) : (
            <Icon as={Copy} fontSize="1.25em" />
          )
        }
      >
        Copy link to clipboard
      </Button>
    </Tooltip>
  )
}

export default CopyButton
