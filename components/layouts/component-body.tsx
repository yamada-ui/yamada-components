import {
  forwardRef,
  Resizable,
  ResizableItem,
  ResizableTrigger,
  useBreakpoint,
} from "@yamada-ui/react"
import type {
  ResizableItemControl,
  ResizableProps,
  ResizableStorage,
} from "@yamada-ui/react"
import type { SetStateAction } from "react"
import { memo, useEffect, useMemo, useRef } from "react"
import { ComponentCodePreview, ComponentPreview } from "components/data-display"
import { CONSTANT } from "constant"
import { useComponent } from "contexts/component-context"
import {
  MOBILE_BREAKPOINTS,
  type CodeDirection,
} from "layouts/component-layout"

export type ComponentBodyProps = ResizableProps & {
  codeDirection: CodeDirection
  onCodeDirectionChange: (valueOrFunc: SetStateAction<CodeDirection>) => void
  isCodePreviewOpen: boolean
  onCodePreviewClose: () => void
}

export const ComponentBody = memo(
  forwardRef<ComponentBodyProps, "div">(
    (
      {
        codeDirection,
        onCodeDirectionChange,
        isCodePreviewOpen,
        onCodePreviewClose,
        ...rest
      },
      ref,
    ) => {
      const controlRef = useRef<ResizableItemControl>(null)
      const { paths, components, metadata } = useComponent()
      const breakpoint = useBreakpoint()

      const storage: ResizableStorage = useMemo(
        () => ({
          getItem: (key) => {
            const match = document.cookie.match(
              new RegExp(`(^| )${key}=([^;]+)`),
            )

            return match ? match[2] : null
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
          storageKey={CONSTANT.STORAGE.COMPONENT_LAYOUT}
          storage={storage}
          {...rest}
        >
          <ResizableItem
            id="preview"
            order={1}
            defaultSize={isCodePreviewOpen ? (isMobile ? 0 : 70) : 100}
            overflow="auto"
            h="full"
          >
            <ComponentPreview
              paths={paths}
              borderTopWidth="1px"
              containerProps={metadata?.options?.container}
              iframe={metadata?.options?.iframe}
              isFullHeight
            />
          </ResizableItem>

          {isCodePreviewOpen ? (
            <>
              <ResizableTrigger
                _active={!isMobile ? { bg: "focus" } : undefined}
                _hover={!isMobile ? { bg: "focus" } : undefined}
                transitionProperty="background"
                transitionDuration="normal"
                isDisabled={isMobile}
              />

              <ResizableItem
                id="code"
                controlRef={controlRef}
                order={2}
                defaultSize={isMobile ? 100 : 30}
                minW="xs"
                minH="xs"
                overflow="auto"
              >
                <ComponentCodePreview
                  components={components}
                  codeDirection={codeDirection}
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
