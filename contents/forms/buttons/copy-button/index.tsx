import { CheckIcon, CopyIcon } from "@yamada-ui/lucide"
import { Button, Tooltip, useClipboard } from "@yamada-ui/react"
import type { FC } from "react"

const CopyButton: FC = () => {
  const { onCopy, hasCopied } = useClipboard("https://yamada-ui.com/")

  return (
    <Tooltip label="Link copied!" bg="success" color="white" isOpen={hasCopied}>
      <Button
        onClick={onCopy}
        rightIcon={
          hasCopied ? <CheckIcon fontSize="1.25em" /> : <CopyIcon fontSize="1.25em" />
        }
      >
        Copy link to clipboard
      </Button>
    </Tooltip>
  )
}

export default CopyButton
