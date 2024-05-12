import {
  forwardRef,
  handlerAll,
  HStack,
  Icon,
  IconButton,
  ScrollArea,
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from "@yamada-ui/react"
import type { TabsProps, UseDisclosureReturn } from "@yamada-ui/react"
import { X } from "lucide-react"
import type { Dispatch, SetStateAction } from "react"
import { memo, useRef } from "react"
import { CodeBlock } from "./code-block"
import type { Component } from "component"
import { CopyButton } from "components/forms"
import { LayoutHorizontal, LayoutVertical } from "components/media-and-icons"
import type { CodeDirection } from "layouts/component-layout"

export type ComponentCodePreviewProps = TabsProps &
  Pick<Component, "components"> & {
    codeDirection?: CodeDirection
    setCodeDirection?: Dispatch<SetStateAction<CodeDirection>>
    codeControls?: UseDisclosureReturn
  }

export const ComponentCodePreview = memo(
  forwardRef<ComponentCodePreviewProps, "div">(
    (
      { components, codeDirection, setCodeDirection, codeControls, ...rest },
      ref,
    ) => {
      const currentCodeRef = useRef<string>(components[0].code)

      const isVertical = codeDirection === "vertical"

      return (
        <Tabs
          ref={ref}
          {...rest}
          onChange={handlerAll(rest.onChange, (index) => {
            currentCodeRef.current = components[index].code
          })}
        >
          <TabList position="sticky" top="0" bg={["white", "black"]}>
            <ScrollArea
              as={HStack}
              type="never"
              overflowX="auto"
              w="full"
              gap="0"
              mb="-px"
              tabIndex={-1}
            >
              {components.map(({ name }) => (
                <Tab
                  key={name}
                  mb="0"
                  overflow="visible"
                  color="muted"
                  _focusVisible={{}}
                >
                  {name}
                </Tab>
              ))}
            </ScrollArea>

            <HStack ms="md" me="sm" gap="0">
              <CopyButton value={currentCodeRef.current} />

              {codeDirection ? (
                <IconButton
                  aria-label="Change code preview direction"
                  size="sm"
                  variant="ghost"
                  color="muted"
                  fontSize="0.8em"
                  icon={isVertical ? <LayoutHorizontal /> : <LayoutVertical />}
                  onClick={() =>
                    setCodeDirection?.((prev) =>
                      prev === "vertical" ? "horizontal" : "vertical",
                    )
                  }
                />
              ) : null}

              {codeControls ? (
                <IconButton
                  aria-label="Close code preview"
                  size="sm"
                  variant="ghost"
                  color="muted"
                  fontSize="1em"
                  icon={<Icon as={X} />}
                  onClick={codeControls.onClose}
                />
              ) : null}
            </HStack>
          </TabList>

          {components.map(({ name, code }) => (
            <TabPanel key={name}>
              <CodeBlock code={code} language="tsx" />
            </TabPanel>
          ))}
        </Tabs>
      )
    },
  ),
)

ComponentCodePreview.displayName = "ComponentCodePreview"
