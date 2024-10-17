import type {
  ResizableItemControl,
  ResizableProps,
  ResizableStorage,
} from "@yamada-ui/react"
import type { CodeDirection } from "layouts/component-layout"
import type { SetStateAction } from "react"
import {
  forwardRef,
  Resizable,
  ResizableItem,
  ResizableTrigger,
  useBreakpoint,
} from "@yamada-ui/react"
import { ComponentCodePreview, ComponentPreview } from "components/data-display"
import { CONSTANT } from "constant"
import { useComponent } from "contexts/component-context"
import { MOBILE_BREAKPOINTS } from "layouts/component-layout"
import { memo, useEffect, useMemo, useRef } from "react"

export type ComponentBodyProps = {
  codeDirection: CodeDirection
  isCodePreviewOpen: boolean
  onCodeDirectionChange: (valueOrFunc: SetStateAction<CodeDirection>) => void
  onCodePreviewClose: () => void
} & ResizableProps

export const ComponentBody = memo(
  forwardRef<ComponentBodyProps, "div">(
    (
      {
        codeDirection,
        isCodePreviewOpen,
        onCodeDirectionChange,
        onCodePreviewClose,
        ...rest
      },
      ref,
    ) => {
      const controlRef = useRef<ResizableItemControl>(null)
      const { components, metadata, paths } = useComponent()
      const breakpoint = useBreakpoint()

      const storage: ResizableStorage = useMemo(
        () => ({
          getItem: (key) => {
            const match = document.cookie.match(
              new RegExp(`(^| )${key}=([^;]+)`),
            )

            return match ? (match[2] ? match[2] : null) : null
          },
          setItem: (key, value) => {
            document.cookie = `${key}=${value}; max-age=31536000; path=/`
          },
        }),
        [],
      )

      useEffect(() => {
        if (!MOBILE_BREAKPOINTS.includes(breakpoint)) return

        if (controlRef.current) controlRef.current.resize(100)
      }, [breakpoint])

      const isMobile = MOBILE_BREAKPOINTS.includes(breakpoint)

      return (
        <Resizable
          ref={ref}
          direction={codeDirection}
          flex="1"
          storage={storage}
          storageKey={CONSTANT.STORAGE.COMPONENT_LAYOUT}
          {...rest}
        >
          <ResizableItem
            id="preview"
            defaultSize={isCodePreviewOpen ? (isMobile ? 0 : 70) : 100}
            h="full"
            order={1}
            overflow="auto"
          >
            <ComponentPreview
              borderTopWidth="1px"
              iframe={metadata?.options?.iframe}
              isFullHeight
              paths={paths}
              containerProps={metadata?.options?.container}
            />
          </ResizableItem>

          {isCodePreviewOpen ? (
            <>
              <ResizableTrigger
                isDisabled={isMobile}
                transitionDuration="normal"
                transitionProperty="background"
                _active={!isMobile ? { bg: "focus" } : undefined}
                _hover={!isMobile ? { bg: "focus" } : undefined}
              />

              <ResizableItem
                id="code"
                controlRef={controlRef}
                defaultSize={isMobile ? 100 : 30}
                minH="xs"
                minW="xs"
                order={2}
                overflow="auto"
              >
                <ComponentCodePreview
                  codeDirection={codeDirection}
                  components={components}
                  onCodeDirectionChange={onCodeDirectionChange}
                  onCodePreviewClose={onCodePreviewClose}
                />
              </ResizableItem>
            </>
          ) : null}
        </Resizable>
      )
    },
  ),
)

ComponentBody.displayName = "ComponentBody"
