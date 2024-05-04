import { IconCheck, IconCopy } from "@tabler/icons-react"
import { Button, Center, Tooltip, useClipboard } from "@yamada-ui/react"
import type { CFC } from "react"

const CopyButton: CFC = () => {
  const { onCopy, hasCopied } = useClipboard("https://yamada-ui.com/")

  return (
    <Center>
      <Tooltip label="リンクをコピーしました！" bg="success" isOpen={hasCopied}>
        <Button
          onClick={onCopy}
          rightIcon={hasCopied ? <IconCheck /> : <IconCopy />}
        >
          リンクをクリップボードにコピー
        </Button>
      </Tooltip>
    </Center>
  )
}

export default CopyButton

export const metadata = {
  title: "クリップボードにコピーするボタン",
  description: "これはテキストをクリップボードにコピーするボタンです",
}
