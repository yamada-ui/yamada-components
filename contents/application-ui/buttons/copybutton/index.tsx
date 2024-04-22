import { IconCheck, IconCopy } from "@tabler/icons-react"
import {
  Button as _Button,
  Center,
  Tooltip,
  useClipboard,
} from "@yamada-ui/react"
import type { FC } from "react"

const CopyButton: FC = () => {
  const { onCopy, hasCopied } = useClipboard("https://yamada-ui.com/")

  return (
    <Center>
      <Tooltip label="Link copied!" bg="success" isOpen={hasCopied}>
        <_Button
          onClick={onCopy}
          rightIcon={hasCopied ? <IconCheck /> : <IconCopy />}
        >
          Copy link to clipboard
        </_Button>
      </Tooltip>
    </Center>
  )
}

export default CopyButton

export const metadata = {
  title: "Copy to clipboard button",
  description: "This is a button that copies the text to the clipboard",
}
