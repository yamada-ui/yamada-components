import {
  forwardRef,
  Heading,
  HStack,
  IconButton,
  Spacer,
} from "@yamada-ui/react"
import type { StackProps, UseDisclosureReturn } from "@yamada-ui/react"
import { memo } from "react"
import {
  Github,
  LayoutHorizontal,
  LayoutVertical,
} from "components/media-and-icons"
import { NextLinkIconButton } from "components/navigation"
import { CONSTANT } from "constant"
import { useComponent } from "contexts/component-context"
import type { CodeDirection } from "layouts/component-layout"

export type ComponentHeaderProps = StackProps & {
  codeDirection: CodeDirection
  codeControls: UseDisclosureReturn
}

export const ComponentHeader = memo(
  forwardRef<ComponentHeaderProps, "div">(
    ({ codeDirection, codeControls, ...rest }, ref) => {
      const { metadata, slug } = useComponent()

      return (
        <HStack
          ref={ref}
          borderBottomWidth="1px"
          py="3"
          px={{ base: "lg", md: "md" }}
          {...rest}
        >
          <Heading fontSize="2xl">{metadata.title}</Heading>

          <Spacer />

          <HStack gap="sm">
            {!codeControls.isOpen ? (
              <IconButton
                aria-label="GitHub source code"
                variant="ghost"
                color="muted"
                icon={
                  codeDirection === "vertical" ? (
                    <LayoutHorizontal />
                  ) : (
                    <LayoutVertical />
                  )
                }
                onClick={codeControls.onOpen}
              />
            ) : null}

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
