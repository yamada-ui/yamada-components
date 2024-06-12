import {
  assignRef,
  Flex,
  forwardRef,
  Heading,
  HStack,
  Icon,
  IconButton,
  noop,
  SegmentedControl,
  SegmentedControlButton,
  Tag,
  VStack,
} from "@yamada-ui/react"
import type { SegmentedControlProps, StackProps } from "@yamada-ui/react"
import { Code2, Download, ExternalLink, Eye } from "lucide-react"
import Link from "next/link"
import type { MutableRefObject, FC } from "react"
import { memo, useMemo, useRef, useState } from "react"
import { ComponentCodePreview } from "./component-code-preview"
import { ComponentPreview } from "./component-preview"
import type { Component } from "component"
import { Github } from "components/media-and-icons"
import { NextLinkIconButton } from "components/navigation"
import { CONSTANT } from "constant"
import { useDownload } from "hooks/use-download"

type Mode = "preview" | "code"

export type ComponentCardProps = StackProps & Component

export const ComponentCard = memo(
  forwardRef<ComponentCardProps, "div">(
    ({ name, metadata, slug, paths, components, ...rest }, ref) => {
      const modeRef = useRef<(mode: Mode) => void>(noop)
      const files = useMemo(
        () => components.map(({ name, code }) => ({ path: name, data: code })),
        [components],
      )
      const { onDownload } = useDownload({ folderName: name, files })

      return (
        <VStack
          ref={ref}
          as="article"
          borderWidth="1px"
          rounded="md"
          gap="0"
          {...rest}
        >
          <HStack
            as="header"
            gap={{ base: "md", sm: "sm" }}
            px="md"
            py="sm"
            borderBottomWidth="1px"
          >
            <HStack flex="1">
              <Heading as="h3" size="sm" fontWeight="semibold" lineClamp={1}>
                {metadata?.title}
              </Heading>

              <HStack gap="sm">
                {metadata?.labels?.slice(0, 5).map((label, index) => (
                  <Link key={index} href={`/search?labels=${label}`}>
                    <Tag
                      size="sm"
                      colorScheme="primary"
                      variant="outline"
                      cursor="pointer"
                    >
                      {label}
                    </Tag>
                  </Link>
                ))}
              </HStack>
            </HStack>

            <HStack gap="sm">
              <IconButton
                aria-label="Download the files"
                variant="outline"
                size="sm"
                display={{ base: "flex", sm: "none" }}
                borderColor="border"
                color="muted"
                icon={<Icon as={Download} fontSize="1.125em" />}
                onClick={() => onDownload()}
              />

              <NextLinkIconButton
                aria-label="Open component preview"
                href={slug}
                isExternal
                variant="outline"
                size="sm"
                borderColor="border"
                color="muted"
                icon={<Icon as={ExternalLink} fontSize="1.125em" />}
              />

              <NextLinkIconButton
                aria-label="GitHub source code"
                href={`${CONSTANT.SNS.GITHUB.EDIT_URL}${slug}`}
                isExternal
                variant="outline"
                size="sm"
                display={{ base: "flex", sm: "none" }}
                borderColor="border"
                color="muted"
                icon={<Github fontSize="0.875em" />}
              />

              <ViewModeControl
                modeRef={modeRef}
                display={{ base: "flex", sm: "none" }}
              />
            </HStack>
          </HStack>

          <ComponentCardBody
            modeRef={modeRef}
            {...{ metadata, paths, components }}
          />
        </VStack>
      )
    },
  ),
)

ComponentCard.displayName = "ComponentCard"

type ViewModeControlProps = SegmentedControlProps & {
  modeRef: MutableRefObject<(mode: Mode) => void>
}

const ViewModeControl: FC<ViewModeControlProps> = memo(
  ({ modeRef, ...rest }) => {
    return (
      <SegmentedControl
        size="sm"
        defaultValue="preview"
        onChange={(mode) => modeRef.current(mode as Mode)}
        {...rest}
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
  },
)

ViewModeControl.displayName = "ViewModeControl"

type ComponentCardBodyProps = Pick<
  Component,
  "paths" | "components" | "metadata"
> & {
  modeRef: MutableRefObject<(mode: Mode) => void>
}

const ComponentCardBody: FC<ComponentCardBodyProps> = memo(
  ({ modeRef, paths, components, metadata }) => {
    const [mode, setMode] = useState<Mode>("preview")

    assignRef(modeRef, setMode)

    return (
      <>
        <ComponentPreview
          paths={paths}
          containerProps={metadata?.options?.container}
          display={mode === "preview" ? "flex" : "none"}
        />
        <ComponentCodePreview
          components={components}
          display={mode === "code" ? "flex" : "none"}
        />
      </>
    )
  },
)

ComponentCardBody.displayName = "ComponentCardBody"
