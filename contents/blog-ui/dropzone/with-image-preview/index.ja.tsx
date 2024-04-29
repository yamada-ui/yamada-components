import {
  Carousel,
  CarouselIndicators,
  CarouselSlide,
} from "@yamada-ui/carousel"
import { Dropzone } from "@yamada-ui/dropzone"
import { Center, Image, Text, extendConfig, useLoading } from "@yamada-ui/react"
import { useState } from "react"
import type { FC } from "react"

export const ImagePreviewDropzone: FC = () => {
  const [imageURL, setImageURL] = useState<string[]>([])
  const { page } = useLoading()
  const handleAcceptedFile = async (files: File[] | undefined) => {
    if (files === undefined || files.length === 0) return
    page.start({ message: "読み込み中" })
    setImageURL([])
    await new Promise((resolve) => setTimeout(resolve, 5000))
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      setImageURL((prev) => [...prev, URL.createObjectURL(file)])
    }
    page.finish()
  }
  return (
    <>
      <Dropzone
        multiple
        accept={{
          "image/*": [],
        }}
        onDropAccepted={handleAcceptedFile}
      >
        <Text>画像ファイルをドラッグ&ドロップ</Text>
      </Dropzone>
      <Carousel
        visibility={imageURL.length > 0 ? "visible" : "hidden"}
        align="center"
        controlProps={{
          background: "blackAlpha.500",
        }}
      >
        {imageURL.map((url, index) => (
          <CarouselSlide
            key={index}
            as={Center}
            position="relative"
            background="blackAlpha.100"
          >
            <Image src={url} w="full" h="full" objectFit="contain" alt="画像" />
          </CarouselSlide>
        ))}

        <CarouselIndicators
          sx={{
            "& > button": {
              _selected: {
                background: "blackAlpha.950",
              },
              background: "blackAlpha.500",
            },
          }}
        />
      </Carousel>
    </>
  )
}

export default ImagePreviewDropzone

export const metadata = {
  title: "画像プレビュー付きのドロップゾーン",
  description: "画像プレビュー付きのドロップゾーン",
}

export const config = extendConfig({
  loading: {
    page: {
      icon: {
        variant: "grid",
      },
    },
  },
})
