import {
  forwardRef,
  Resizable,
  ResizableItem,
  ResizableTrigger,
} from "@yamada-ui/react"
import type {
  ResizableProps,
  ResizableStorage,
  UseDisclosureReturn,
} from "@yamada-ui/react"
import type { Dispatch, SetStateAction } from "react"
import { memo, useMemo } from "react"
import { ComponentCodePreview, ComponentPreview } from "components/data-display"
import { CONSTANT } from "constant"
import { useComponent } from "contexts/component-context"
import type { CodeDirection } from "layouts/component-layout"

export type ComponentBodyProps = ResizableProps & {
  codeDirection: CodeDirection
  setCodeDirection: Dispatch<SetStateAction<CodeDirection>>
  codeControls: UseDisclosureReturn
}

export const ComponentBody = memo(
  forwardRef<ComponentBodyProps, "div">(
    ({ codeDirection, setCodeDirection, codeControls, ...rest }, ref) => {
      const { paths, components } = useComponent()

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

      const isVertical = codeDirection === "vertical"

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
            defaultSize={70}
            overflow="auto"
            h="full"
          >
            <ComponentPreview paths={paths} borderTopWidth="1px" />
          </ResizableItem>

          {codeControls.isOpen ? (
            <>
              <ResizableTrigger
                _active={{ bg: "focus" }}
                _hover={{ bg: "focus" }}
                transitionProperty="background"
                transitionDuration="normal"
              />

              <ResizableItem
                id="code"
                order={2}
                defaultSize={30}
                minW="xs"
                minH="xs"
                overflow="auto"
              >
                <ComponentCodePreview
                  components={components}
                  codeDirection={codeDirection}
                  setCodeDirection={setCodeDirection}
                  codeControls={codeControls}
                  borderTopWidth={isVertical ? "0px" : "1px"}
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
