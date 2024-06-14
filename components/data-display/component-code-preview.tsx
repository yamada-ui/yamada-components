import { X } from "@yamada-ui/lucide"
import {
  forwardRef,
  handlerAll,
  HStack,
  IconButton,
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from "@yamada-ui/react"
import type { TabsProps } from "@yamada-ui/react"
import type { SetStateAction } from "react"
import { memo, useRef } from "react"
import { CodeBlock } from "./code-block"
import type { Component } from "component"
import { CopyButton } from "components/forms"
import { LayoutHorizontal, LayoutVertical } from "components/media-and-icons"
import type { CodeDirection } from "layouts/component-layout"

export type ComponentCodePreviewProps = TabsProps &
  Pick<Component, "components"> & {
    codeDirection?: CodeDirection
    onCodeDirectionChange?: (valueOrFunc: SetStateAction<CodeDirection>) => void
    onCodePreviewClose?: () => void
  }

export const ComponentCodePreview = memo(
  forwardRef<ComponentCodePreviewProps, "div">(
    (
      {
        components,
        codeDirection,
        onCodeDirectionChange,
        onCodePreviewClose,
        ...rest
      },
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
            <HStack
              tabIndex={-1}
              mb="-px"
              w="full"
              gap="0"
              overflowX="auto"
              scrollbarWidth="none"
              _scrollbar={{ display: "none" }}
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
            </HStack>

            <HStack ms="md" me="sm" gap="0">
              <CopyButton value={currentCodeRef.current} />

              {codeDirection ? (
                <IconButton
                  aria-label="Change code preview direction"
                  size="sm"
                  variant="ghost"
                  display={{ base: "inline-flex", md: "none" }}
                  color="muted"
                  icon={
                    isVertical ? (
                      <LayoutHorizontal boxSize="4" />
                    ) : (
                      <LayoutVertical boxSize="4" />
                    )
                  }
                  onClick={() =>
                    onCodeDirectionChange?.((prev) =>
                      prev === "vertical" ? "horizontal" : "vertical",
                    )
                  }
                />
              ) : null}

              {onCodePreviewClose ? (
                <IconButton
                  aria-label="Close code preview"
                  size="sm"
                  variant="ghost"
                  color="muted"
                  fontSize="lg"
                  icon={<X />}
                  onClick={onCodePreviewClose}
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
