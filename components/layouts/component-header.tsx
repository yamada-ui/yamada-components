import {
  forwardRef,
  Heading,
  HStack,
  Icon,
  IconButton,
  Spacer,
} from "@yamada-ui/react"
import type { StackProps } from "@yamada-ui/react"
import { Download } from "lucide-react"
import { memo, useMemo } from "react"
import { ColorModeButton, ThemeSchemeButton } from "components/forms"
import {
  Github,
  LayoutHorizontal,
  LayoutVertical,
} from "components/media-and-icons"
import { NextLinkIconButton } from "components/navigation"
import { CONSTANT } from "constant"
import { useComponent } from "contexts/component-context"
import { useDownload } from "hooks/use-download"
import type { CodeDirection } from "layouts/component-layout"

export type ComponentHeaderProps = StackProps & {
  codeDirection: CodeDirection
  isCodePreviewOpen: boolean
  onCodePreviewOpen: () => void
}

export const ComponentHeader = memo(
  forwardRef<ComponentHeaderProps, "div">(
    ({ codeDirection, isCodePreviewOpen, onCodePreviewOpen, ...rest }, ref) => {
      const { name, metadata, slug, components } = useComponent()
      const files = useMemo(
        () => components.map(({ name, code }) => ({ path: name, data: code })),
        [components],
      )
      const { onDownload } = useDownload({ folderName: name, files })

      const isVertical = codeDirection === "vertical"

      return (
        <HStack ref={ref} py="3" px={{ base: "lg", md: "md" }} {...rest}>
          <Heading fontSize="2xl">{metadata?.title ?? "Unknown"}</Heading>

          <Spacer />

          <HStack gap="sm">
            {!isCodePreviewOpen ? (
              <IconButton
                aria-label="GitHub source code"
                variant="ghost"
                color="muted"
                icon={isVertical ? <LayoutVertical /> : <LayoutHorizontal />}
                onClick={onCodePreviewOpen}
              />
            ) : null}

            <IconButton
              aria-label="Download the files"
              variant="ghost"
              color="muted"
              icon={<Icon as={Download} fontSize="1.375em" />}
              onClick={() => onDownload()}
            />

            <ThemeSchemeButton />

            <ColorModeButton />

            <NextLinkIconButton
              href={`${CONSTANT.SNS.GITHUB.EDIT_URL}${slug}`}
              isExternal
              aria-label="GitHub source code"
              variant="ghost"
              color="muted"
              icon={<Github />}
            />
          </HStack>
        </HStack>
      )
    },
  ),
)

ComponentHeader.displayName = "ComponentHeader"
