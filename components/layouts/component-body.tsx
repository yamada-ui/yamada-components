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

      return (
        <Resizable ref={ref} direction={codeDirection} h="100vh" {...rest}>
          <ResizableItem overflow="auto">
            <ComponentPreview paths={paths} />
          </ResizableItem>

          <ResizableTrigger />

          {codeControls.isOpen ? (
            <ResizableItem overflow="auto">
              <ComponentCode
                components={components}
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
