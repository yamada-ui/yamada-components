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
import { LayoutHorizontal, LayoutVertical } from "components/media-and-icons"
import { useComponent } from "contexts/component-context"
import type { CodeDirection } from "layouts/component-layout"

export type ComponentCodeProps = TabsProps & {
  codeDirection: CodeDirection
  setCodeDirection: Dispatch<SetStateAction<CodeDirection>>
  codeControls: UseDisclosureReturn
}

export const ComponentCode = memo(
  forwardRef<ComponentCodeProps, "div">(
    ({ codeDirection, setCodeDirection, codeControls, ...rest }, ref) => {
      const { components } = useComponent()

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
              {components.map(({ name }) => (
                <Tab key={name} mb="0" overflow="visible">
                  {name}
                </Tab>
              ))}
              {components.map(({ name }) => (
                <Tab key={name} mb="0" overflow="visible">
                  {name}
                </Tab>
              ))}
              {components.map(({ name }) => (
                <Tab key={name} mb="0" overflow="visible">
                  {name}
                </Tab>
              ))}
              {components.map(({ name }) => (
                <Tab key={name} mb="0" overflow="visible">
                  {name}
                </Tab>
              ))}
              {components.map(({ name }) => (
                <Tab key={name} mb="0" overflow="visible">
                  {name}
                </Tab>
              ))}
              {components.map(({ name }) => (
                <Tab key={name} mb="0" overflow="visible">
                  {name}
                </Tab>
              ))}
              {components.map(({ name }) => (
                <Tab key={name} mb="0" overflow="visible">
                  {name}
                </Tab>
              ))}
              {components.map(({ name }) => (
                <Tab key={name} mb="0" overflow="visible">
                  {name}
                </Tab>
              ))}
              {components.map(({ name }) => (
                <Tab key={name} mb="0" overflow="visible">
                  {name}
                </Tab>
              ))}
              {components.map(({ name }) => (
                <Tab key={name} mb="0" overflow="visible">
                  {name}
                </Tab>
              ))}
              {components.map(({ name }) => (
                <Tab key={name} mb="0" overflow="visible">
                  {name}
                </Tab>
              ))}
            </ScrollArea>

            <HStack ms="md" me="sm" gap="0">
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
                  setCodeDirection((prev) =>
                    prev === "vertical" ? "horizontal" : "vertical",
                  )
                }
              />

              <IconButton
                size="sm"
                variant="ghost"
                color="muted"
                fontSize="1em"
                icon={<Icon as={X} />}
                onClick={codeControls.onClose}
              />
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

ComponentCode.displayName = "ComponentCode"
