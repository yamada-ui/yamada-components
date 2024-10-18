import JSZip from "jszip"
import { useCallback } from "react"

interface UseDownloadProps {
  files?: { data: string; path: string }[]
  folderName?: string
}

export const useDownload = (props: UseDownloadProps = {}) => {
  const onDownload = useCallback(
    async ({ files, folderName }: UseDownloadProps = {}) => {
      folderName ??= props.folderName
      files ??= props.files ?? []

      if (!folderName) return

      const zip = new JSZip()
      const folder = zip.folder(folderName)

      files.forEach(({ data, path }) => folder?.file(path, data))

      const content = await zip.generateAsync({ type: "blob" })

      const el = document.createElement("a")

      el.href = URL.createObjectURL(content)
      el.download = `${folderName}.zip`

      document.body.appendChild(el)

      el.click()

      document.body.removeChild(el)
    },
    [props],
  )

  return { onDownload }
}
