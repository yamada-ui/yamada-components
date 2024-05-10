import { IconCheck, IconCopy } from "@tabler/icons-react"
import { Button, Center, Tooltip, useClipboard } from "@yamada-ui/react"
import type { CFC } from "react"

const CopyButton: CFC = () => {
  const { onCopy, hasCopied } = useClipboard("https://yamada-ui.com/")

  return (
    <Center>
      <Tooltip label="Link copied!" bg="success" isOpen={hasCopied}>
        <Button
          onClick={onCopy}
          rightIcon={hasCopied ? <IconCheck /> : <IconCopy />}
        >
          Copy link to clipboard
        </Button>
      </Tooltip>
    </Center>
  )
}

export default CopyButton

export const hoge = {}
