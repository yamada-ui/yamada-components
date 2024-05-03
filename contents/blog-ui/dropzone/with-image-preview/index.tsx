import {
  Carousel,
  CarouselIndicators,
  CarouselSlide,
} from "@yamada-ui/carousel"
import { Dropzone } from "@yamada-ui/dropzone"
import { Center, Image, Text, extendConfig, useLoading } from "@yamada-ui/react"
import { useState } from "react"
import type { CFC } from "react"

export const ImagePreviewDropzone: CFC = () => {
  const [imageURL, setImageURL] = useState<string[]>([])
  const { page } = useLoading()
  const handleAcceptedFile = async (files: File[] | undefined) => {
    if (files === undefined || files.length === 0) return
    page.start({ message: "loading" })
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
        <Text>Drag and Drop Image File</Text>
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
            <Image
              src={url}
              w="full"
              h="full"
              objectFit="contain"
              alt="image"
            />
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

export const config = extendConfig({
  loading: {
    page: {
      icon: {
        variant: "grid",
      },
    },
  },
})

export const metadata = {
  title: "Dropzone image preview",
  description: "This is a Dropzone with image preview",
}
