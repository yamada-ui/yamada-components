import type { SegmentedControlProps, StackProps } from "@yamada-ui/react"
import type { Component } from "component"
import type { FC, MutableRefObject } from "react"
import {
  CodeIcon,
  DownloadIcon,
  ExternalLinkIcon,
  EyeIcon,
} from "@yamada-ui/lucide"
import {
  assignRef,
  Flex,
  forwardRef,
  Heading,
  HStack,
  IconButton,
  noop,
  SegmentedControl,
  SegmentedControlButton,
  Tag,
  Text,
  VStack,
} from "@yamada-ui/react"
import { Github } from "components/media-and-icons"
import { NextLinkIconButton } from "components/navigation"
import { CONSTANT } from "constant"
import { useDownload } from "hooks/use-download"
import Link from "next/link"
import { memo, useMemo, useRef, useState } from "react"
import { ComponentCodePreview } from "./component-code-preview"
import { ComponentPreview } from "./component-preview"

type Mode = "code" | "preview"

export type ComponentCardProps = Component & StackProps

export const ComponentCard = memo(
  forwardRef<ComponentCardProps, "div">(
    ({ name, components, metadata, paths, slug, ...rest }, ref) => {
      const modeRef = useRef<(mode: Mode) => void>(noop)
      const files = useMemo(
        () => components.map(({ name, code }) => ({ data: code, path: name })),
        [components],
      )
      const { onDownload } = useDownload({ files, folderName: name })

      return (
        <VStack
          ref={ref}
          as="article"
          borderWidth="1px"
          gap="0"
          rounded="md"
          {...rest}
        >
          <HStack
            as="header"
            borderBottomWidth="1px"
            gap={{ base: "md", sm: "sm" }}
            px="md"
            py="sm"
          >
            <HStack flex="1">
              <Heading as="h3" size="sm" fontWeight="semibold" lineClamp={1}>
                {metadata?.title}
              </Heading>

              <HStack gap="sm">
                {metadata?.labels?.slice(0, 5).map((label, index) => (
                  <Link key={index} href={`/search?labels=${label}`}>
                    <Tag
                      colorScheme="primary"
                      size="sm"
                      variant="outline"
                      cursor="pointer"
                    >
                      {label}
                    </Tag>
                  </Link>
                ))}
              </HStack>
            </HStack>

            <HStack gap="sm" z="0">
              <IconButton
                size="sm"
                variant="outline"
                aria-label="Download the files"
                borderColor="border"
                color="muted"
                display={{ base: "flex", sm: "none" }}
                icon={<DownloadIcon fontSize="md" />}
                onClick={async () => onDownload()}
              />

              <NextLinkIconButton
                href={slug}
                size="sm"
                variant="outline"
                aria-label="Open component preview"
                borderColor="border"
                color="muted"
                icon={<ExternalLinkIcon fontSize="md" />}
                isExternal
              />

              <NextLinkIconButton
                href={`${CONSTANT.SNS.GITHUB.EDIT_URL}${slug}`}
                size="sm"
                variant="outline"
                aria-label="GitHub source code"
                borderColor="border"
                color="muted"
                display={{ base: "flex", sm: "none" }}
                icon={<Github boxSize="1rem" />}
                isExternal
              />

              <ViewModeControl
                display={{ base: "flex", sm: "none" }}
                modeRef={modeRef}
              />
            </HStack>
          </HStack>

          <ComponentCardBody
            modeRef={modeRef}
            {...{ components, metadata, paths }}
          />
        </VStack>
      )
    },
  ),
)

ComponentCard.displayName = "ComponentCard"

type ViewModeControlProps = {
  modeRef: MutableRefObject<(mode: Mode) => void>
} & SegmentedControlProps

const ViewModeControl: FC<ViewModeControlProps> = memo(
  ({ modeRef, ...rest }) => {
    return (
      <SegmentedControl
        size="sm"
        defaultValue="preview"
        minW={{ base: "xs", md: "auto" }}
        onChange={(mode) => modeRef.current(mode as Mode)}
        {...rest}
      >
        <SegmentedControlButton value="preview">
          <Flex alignItems="center" gap="sm">
            <EyeIcon color="muted" fontSize="md" />
            <Text display={{ base: "inline", md: "none" }}>Preview</Text>
          </Flex>
        </SegmentedControlButton>

        <SegmentedControlButton value="code">
          <Flex alignItems="center" gap="sm">
            <CodeIcon color="muted" fontSize="md" />
            <Text display={{ base: "inline", md: "none" }}>Code</Text>
          </Flex>
        </SegmentedControlButton>
      </SegmentedControl>
    )
  },
)

ViewModeControl.displayName = "ViewModeControl"

type ComponentCardBodyProps = {
  modeRef: MutableRefObject<(mode: Mode) => void>
} & Pick<Component, "components" | "metadata" | "paths">

const ComponentCardBody: FC<ComponentCardBodyProps> = memo(
  ({ components, metadata, modeRef, paths }) => {
    const [mode, setMode] = useState<Mode>("preview")

    assignRef(modeRef, setMode)

    return (
      <>
        <ComponentPreview
          display={mode === "preview" ? "flex" : "none"}
          iframe={metadata?.options?.iframe}
          paths={paths}
          z="1"
          containerProps={metadata?.options?.container}
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
