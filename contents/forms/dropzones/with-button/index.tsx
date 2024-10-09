import type { FC } from "react"
import {
  Dropzone,
  DropzoneAccept,
  DropzoneIdle,
  DropzoneReject,
  PDF_ACCEPT_TYPE,
} from "@yamada-ui/dropzone"
import { CloudUploadIcon } from "@yamada-ui/lucide"
import { Button, Center, Text } from "@yamada-ui/react"
import { useRef } from "react"

const WithButton: FC = () => {
  const openRef = useRef<() => void>(null)

  const onOpen = () => {
    if (openRef.current) openRef.current()
  }

  return (
    <Center maxW="lg" position="relative">
      <Dropzone
        accept={PDF_ACCEPT_TYPE}
        flexDir="column"
        gap="md"
        h="xs"
        multiple
        openRef={openRef}
      >
        <Center color={["blackAlpha.800", "whiteAlpha.800"]}>
          <DropzoneAccept>
            <CloudUploadIcon boxSize="3.15rem" />
          </DropzoneAccept>
          <DropzoneReject>
            <CloudUploadIcon boxSize="3.15rem" />
          </DropzoneReject>
          <DropzoneIdle>
            <CloudUploadIcon boxSize="3.15rem" />
          </DropzoneIdle>
        </Center>

        <Text
          color={["blackAlpha.800", "whiteAlpha.800"]}
          fontSize="lg"
          fontWeight={700}
          textAlign="center"
          userSelect="none"
        >
          <DropzoneAccept>Drop files here</DropzoneAccept>
          <DropzoneReject>Pdf file less than 30mb</DropzoneReject>
          <DropzoneIdle>Upload resume</DropzoneIdle>
        </Text>

        <Text
          color="gray"
          fontSize="sm"
          mt="xs"
          textAlign="center"
          userSelect="none"
        >
          Drag&apos;n&apos;drop files here to upload. We can accept only{" "}
          <Text as="i">.pdf</Text> files that are less than 30mb in size.
        </Text>
      </Dropzone>

      <Button
        colorScheme="primary"
        bottom="0"
        position="absolute"
        rounded="3xl"
        transform="translate(0, 50%)"
        w="xs"
        z="1"
        onClick={onOpen}
      >
        Select files
      </Button>
    </Center>
  )
}

export default WithButton
