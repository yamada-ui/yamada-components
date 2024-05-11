import {
  assignRef,
  Flex,
  forwardRef,
  Heading,
  HStack,
  Icon,
  noop,
  SegmentedControl,
  SegmentedControlButton,
  Spacer,
  VStack,
} from "@yamada-ui/react"
import type { StackProps } from "@yamada-ui/react"
import { Code2, ExternalLink, Eye } from "lucide-react"
import type { MutableRefObject, FC } from "react"
import { memo, useRef, useState } from "react"
import { ComponentCode } from "./component-code"
import { ComponentPreview } from "./component-preview"
import type { Component } from "component"
import { Github } from "components/media-and-icons"
import { NextLinkIconButton } from "components/navigation"
import { CONSTANT } from "constant"

type Mode = "preview" | "code"

export type ComponentCardProps = StackProps & Omit<Component, "name">

export const ComponentCard = memo(
  forwardRef<ComponentCardProps, "div">(
    ({ metadata, slug, paths, components, ...rest }, ref) => {
      const modeRef = useRef<(mode: Mode) => void>(noop)

      return (
        <VStack
          ref={ref}
          as="article"
          borderWidth="1px"
          rounded="md"
          gap="0"
          {...rest}
        >
          <HStack as="header" px="md" py="sm" borderBottomWidth="1px">
            <Heading as="h3" size="sm" fontWeight="semibold">
              {metadata.title}
            </Heading>

            <Spacer />

            <HStack gap="sm">
              <NextLinkIconButton
                aria-label="Open component preview"
                href={slug}
                variant="outline"
                borderColor="border"
                size="sm"
                color="muted"
                icon={<Icon as={ExternalLink} fontSize="1.2em" />}
              />

              <NextLinkIconButton
                aria-label="GitHub source code"
                href={`${CONSTANT.SNS.GITHUB.EDIT_URL}${slug}`}
                isExternal
                variant="outline"
                borderColor="border"
                size="sm"
                color="muted"
                icon={<Github />}
              />

              <ViewModeControl modeRef={modeRef} />
            </HStack>
          </HStack>

          <ComponentCardBody modeRef={modeRef} {...{ paths, components }} />
        </VStack>
      )
    },
  ),
)

ComponentCard.displayName = "ComponentCard"

type ViewModeControlProps = {
  modeRef: MutableRefObject<(mode: Mode) => void>
}

const ViewModeControl: FC<ViewModeControlProps> = memo(({ modeRef }) => {
  return (
    <SegmentedControl
      size="sm"
      defaultValue="preview"
      onChange={(mode) => modeRef.current(mode as Mode)}
    >
      <SegmentedControlButton value="preview">
        <Flex alignItems="center" gap="sm">
          <Icon as={Eye} fontSize="1.25em" color="muted" />
          Preview
        </Flex>
      </SegmentedControlButton>

      <SegmentedControlButton value="code">
        <Flex alignItems="center" gap="sm">
          <Icon as={Code2} fontSize="1.25em" color="muted" />
          Code
        </Flex>
      </SegmentedControlButton>
    </SegmentedControl>
  )
})

ViewModeControl.displayName = "ViewModeControl"

type ComponentCardBodyProps = Pick<Component, "paths" | "components"> & {
  modeRef: MutableRefObject<(mode: Mode) => void>
}

const ComponentCardBody: FC<ComponentCardBodyProps> = memo(
  ({ modeRef, paths, components }) => {
    const [mode, setMode] = useState<Mode>("preview")

    assignRef(modeRef, setMode)

    if (mode === "preview") {
      return <ComponentPreview paths={paths} />
    } else {
      return <ComponentCode components={components} />
    }
  },
)

ComponentCardBody.displayName = "ComponentCardBody"
