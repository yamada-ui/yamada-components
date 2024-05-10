import {
  forwardRef,
  Resizable,
  ResizableItem,
  ResizableTrigger,
} from "@yamada-ui/react"
import type { ResizableProps, UseDisclosureReturn } from "@yamada-ui/react"
import type { Dispatch, SetStateAction } from "react"
import { memo } from "react"
import { ComponentCode, ComponentPreview } from "components/data-display"
import type { CodeDirection } from "layouts/component-layout"

export type ComponentBodyProps = ResizableProps & {
  codeDirection: CodeDirection
  setCodeDirection: Dispatch<SetStateAction<CodeDirection>>
  codeControls: UseDisclosureReturn
}

export const ComponentBody = memo(
  forwardRef<ComponentBodyProps, "div">(
    ({ codeDirection, setCodeDirection, codeControls, ...rest }, ref) => {
      return (
        <Resizable ref={ref} direction={codeDirection} h="100vh" {...rest}>
          <ResizableItem overflow="auto">
            <ComponentPreview />
          </ResizableItem>

          <ResizableTrigger />

          {codeControls.isOpen ? (
            <ResizableItem overflow="auto">
              <ComponentCode
                codeDirection={codeDirection}
                setCodeDirection={setCodeDirection}
                codeControls={codeControls}
              />
            </ResizableItem>
          ) : null}
        </Resizable>
      )
    },
  ),
)

ComponentBody.displayName = "ComponentBody"
