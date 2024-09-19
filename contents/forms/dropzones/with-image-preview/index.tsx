import { Dropzone } from "@yamada-ui/dropzone"
import { Center, Image, Text, useLoading, VStack, Wrap } from "@yamada-ui/react"
import { useState } from "react"
import type { FC } from "react"

export const ImagePreviewDropzone: FC = () => {
  const [imageURL, setImageURL] = useState<string[]>([])
  const { page } = useLoading()

  const handleAcceptedFile = async (files: File[] | undefined) => {
    if (files === undefined || files.length === 0) return

    page.start({ message: "Loading..." })

    setImageURL([])

    await new Promise((resolve) => setTimeout(resolve, 1000))

    for (const file of files) {      
      setImageURL((prev) => [...prev, URL.createObjectURL(file)])
    }
    page.finish()
  }

  return (
    <VStack maxW="5xl">
      <Dropzone
        multiple
        accept={{
          "image/*": [],
        }}
        onDropAccepted={handleAcceptedFile}
      >
        <Text>Drag and Drop Image Files</Text>
      </Dropzone>

      <Wrap as={Center} gap="md">
        {imageURL.map((url, index) => (
          <Image
            key={index}
            src={url}
            alt={`image-${index}`}
            width={200}
            height={200}
            objectFit="contain"
          />
        ))}
      </Wrap>
    </VStack>
  )
}

export default ImagePreviewDropzone
