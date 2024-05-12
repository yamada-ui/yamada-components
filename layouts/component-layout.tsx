import type { ResizableProps, StackProps } from "@yamada-ui/react"
import {
  useDisclosure,
  VStack,
  useIsMounted,
  runIfFunc,
  useLoading,
  useUpdateEffect,
} from "@yamada-ui/react"
import { useCallback, useState } from "react"
import type { SetStateAction, FC } from "react"
import { ComponentBody, ComponentHeader } from "components/layouts"
import { SEO } from "components/media-and-icons"
import { CONSTANT } from "constant"
import { getCookie, setCookie } from "utils/storage"

export type CodeDirection = ResizableProps["direction"]

type ComponentLayoutOptions = {
  title: string
  description: string
}

export type ComponentLayoutProps = ComponentLayoutOptions

export const ComponentLayout: FC<ComponentLayoutProps> = ({
  title,
  description,
}) => {
  return (
    <>
      <SEO title={title} description={description} />

      <ComponentLayoutBody />
    </>
  )
}

type ComponentLayoutBodyProps = StackProps

const ComponentLayoutBody: FC<ComponentLayoutBodyProps> = ({ ...rest }) => {
  const { screen } = useLoading()
  const codeControls = useDisclosure()
  const [codeDirection, setCodeDirection] = useState<CodeDirection>("vertical")
  const [, isMounted] = useIsMounted({ rerender: true })
  const isCodePreviewOpen = codeControls.isOpen

  const onCodePreviewOpen = useCallback(() => {
    codeControls.onOpen()
    setCookie(CONSTANT.STORAGE.COMPONENT_CODE_PREVIEW_IS_OPEN, "true")
  }, [codeControls])

  const onCodePreviewClose = useCallback(() => {
    codeControls.onClose()
    setCookie(CONSTANT.STORAGE.COMPONENT_CODE_PREVIEW_IS_OPEN, "false")
  }, [codeControls])

  const onCodeDirectionChange = useCallback(
    (valueOrFunc: SetStateAction<CodeDirection>) =>
      setCodeDirection((prev) => {
        const next = runIfFunc(valueOrFunc, prev)

        setCookie(CONSTANT.STORAGE.COMPONENT_CODE_PREVIEW_DIRECTION, next)

        return next
      }),
    [],
  )

  useUpdateEffect(() => {
    if (!isMounted) return

    const codeDirection = getCookie<CodeDirection>(
      document.cookie,
      CONSTANT.STORAGE.COMPONENT_CODE_PREVIEW_DIRECTION,
      "vertical",
    )

    const strIsOpen = getCookie<string>(
      document.cookie,
      CONSTANT.STORAGE.COMPONENT_CODE_PREVIEW_IS_OPEN,
      "false",
    )
    const isOpen = strIsOpen === "true"

    if (isOpen) codeControls.onOpen()
    setCodeDirection(codeDirection)

    screen.finish()
  }, [isMounted])

  return (
    <VStack display={isMounted ? "flex" : "none"} h="100dvh" gap="0" {...rest}>
      <ComponentHeader
        {...{ codeDirection, isCodePreviewOpen, onCodePreviewOpen }}
      />

      <ComponentBody
        {...{
          codeDirection,
          onCodeDirectionChange,
          isCodePreviewOpen,
          onCodePreviewClose,
        }}
      />
    </VStack>
  )
}
