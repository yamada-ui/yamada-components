import type { TabsProps } from "@yamada-ui/react"
import type { Component } from "component"
import type { CodeDirection } from "layouts/component-layout"
import type { SetStateAction } from "react"
import { XIcon } from "@yamada-ui/lucide"
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
import { CopyButton } from "components/forms"
import { LayoutHorizontal, LayoutVertical } from "components/media-and-icons"
import { memo, useRef } from "react"
import { CodeBlock } from "./code-block"

export type ComponentCodePreviewProps = {
  codeDirection?: CodeDirection
  onCodeDirectionChange?: (valueOrFunc: SetStateAction<CodeDirection>) => void
  onCodePreviewClose?: () => void
} & Pick<Component, "components"> &
  TabsProps

export const ComponentCodePreview = memo(
  forwardRef<ComponentCodePreviewProps, "div">(
    (
      {
        codeDirection,
        components,
        onCodeDirectionChange,
        onCodePreviewClose,
        ...rest
      },
      ref,
    ) => {
      const code =
        components.length && components[0]?.code ? components[0].code : ""
      const currentCodeRef = useRef<string>(code)

      const isVertical = codeDirection === "vertical"

      return (
        <Tabs
          ref={ref}
          {...rest}
          onChange={handlerAll(rest.onChange, (index) => {
            const code =
              components.length && components[index]?.code
                ? components[index].code
                : ""
            currentCodeRef.current = code
          })}
        >
          <TabList
            bg={["white", "black"]}
            borderTopWidth={isVertical ? "0px" : "1px"}
            position="sticky"
            top="0"
          >
            <HStack
              gap="0"
              mb="-px"
              overflowX="auto"
              scrollbarWidth="none"
              tabIndex={-1}
              w="full"
              _scrollbar={{ display: "none" }}
            >
              {components.map(({ name }) => (
                <Tab
                  key={name}
                  color="muted"
                  mb="0"
                  overflow="visible"
                  _focusVisible={{}}
                >
                  {name}
                </Tab>
              ))}
            </HStack>

            <HStack gap="0" me="sm" ms="md">
              <CopyButton value={currentCodeRef.current} />

              {codeDirection ? (
                <IconButton
                  size="sm"
                  variant="ghost"
                  aria-label="Change code preview direction"
                  color="muted"
                  display={{ base: "inline-flex", md: "none" }}
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
                  size="sm"
                  variant="ghost"
                  aria-label="Close code preview"
                  color="muted"
                  fontSize="lg"
                  icon={<XIcon />}
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
