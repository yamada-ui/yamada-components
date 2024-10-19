import type { ResizableProps, StackProps } from "@yamada-ui/react"
import type { FC, SetStateAction } from "react"
import {
  runIfFunc,
  useBreakpoint,
  useDisclosure,
  useIsMounted,
  useLoading,
  useUpdateEffect,
  VStack,
} from "@yamada-ui/react"
import { ComponentBody, ComponentHeader } from "components/layouts"
import { Seo } from "components/media-and-icons"
import { CONSTANT } from "constant"
import { useCallback, useEffect, useState } from "react"
import { getCookie, setCookie } from "utils/storage"

export const MOBILE_BREAKPOINTS = ["md", "sm"]
export const DEFAULT_DIRECTION = "vertical"
export type CodeDirection = ResizableProps["direction"]

interface ComponentLayoutOptions {
  description?: string
  title?: string
}

export type ComponentLayoutProps = ComponentLayoutOptions

export const ComponentLayout: FC<ComponentLayoutProps> = ({
  description,
  title,
}) => {
  return (
    <>
      <Seo description={description} title={title} />

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
  const breakpoint = useBreakpoint()
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

        setCookie(
          CONSTANT.STORAGE.COMPONENT_CODE_PREVIEW_DIRECTION,
          next ?? DEFAULT_DIRECTION,
        )

        return next
      }),
    [],
  )

  useEffect(() => {
    if (!MOBILE_BREAKPOINTS.includes(breakpoint)) return

    onCodeDirectionChange("vertical")
  }, [breakpoint, onCodeDirectionChange])

  useUpdateEffect(() => {
    if (!isMounted) return

    const isOpen =
      getCookie<string>(
        document.cookie,
        CONSTANT.STORAGE.COMPONENT_CODE_PREVIEW_IS_OPEN,
        "false",
      ) === "true"

    if (isOpen) codeControls.onOpen()

    if (!MOBILE_BREAKPOINTS.includes(breakpoint)) {
      const codeDirection = getCookie<CodeDirection>(
        document.cookie,
        CONSTANT.STORAGE.COMPONENT_CODE_PREVIEW_DIRECTION,
        "vertical",
      )

      setCodeDirection(codeDirection)
    }

    screen.finish()
  }, [isMounted])

  return (
    <VStack display={isMounted ? "flex" : "none"} gap="0" h="100dvh" {...rest}>
      <ComponentHeader
        {...{ codeDirection, isCodePreviewOpen, onCodePreviewOpen }}
      />

      <ComponentBody
        {...{
          codeDirection,
          isCodePreviewOpen,
          onCodeDirectionChange,
          onCodePreviewClose,
        }}
      />
    </VStack>
  )
}
