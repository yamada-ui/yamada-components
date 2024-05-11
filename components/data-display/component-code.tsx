import {
  forwardRef,
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
import { memo } from "react"
import { CodeBlock } from "./code-block"
import type { Component } from "component"
import { LayoutHorizontal, LayoutVertical } from "components/media-and-icons"
import type { CodeDirection } from "layouts/component-layout"

export type ComponentCodeProps = TabsProps &
  Pick<Component, "components"> & {
    codeDirection?: CodeDirection
    setCodeDirection?: Dispatch<SetStateAction<CodeDirection>>
    codeControls?: UseDisclosureReturn
  }

export const ComponentCode = memo(
  forwardRef<ComponentCodeProps, "div">(
    (
      { components, codeDirection, setCodeDirection, codeControls, ...rest },
      ref,
    ) => {
      return (
        <Tabs ref={ref} {...rest}>
          <TabList>
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
                <Tab key={name} mb="0" overflow="visible" _focusVisible={{}}>
                  {name}
                </Tab>
              ))}
            </ScrollArea>

            {codeDirection || codeControls ? (
              <HStack ms="md" me="sm" gap="0">
                {codeDirection ? (
                  <IconButton
                    size="sm"
                    variant="ghost"
                    color="muted"
                    fontSize="0.8em"
                    icon={
                      codeDirection === "vertical" ? (
                        <LayoutHorizontal />
                      ) : (
                        <LayoutVertical />
                      )
                    }
                    onClick={() =>
                      setCodeDirection?.((prev) =>
                        prev === "vertical" ? "horizontal" : "vertical",
                      )
                    }
                  />
                ) : null}

                {codeControls ? (
                  <IconButton
                    size="sm"
                    variant="ghost"
                    color="muted"
                    fontSize="1em"
                    icon={<Icon as={X} />}
                    onClick={codeControls.onClose}
                  />
                ) : null}
              </HStack>
            ) : null}
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

ComponentCode.displayName = "ComponentCode"
