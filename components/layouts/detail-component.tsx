import type { ResizableProps } from "@yamada-ui/react"
import {
  Box,
  HStack,
  Resizable,
  ResizableItem,
  ResizableTrigger,
  ui,
  useBoolean,
} from "@yamada-ui/react"
import { useRouter } from "next/router"
import { createContext, useContext, useState } from "react"
import type { ComponentProps, FC } from "react"
import type { ComponentPreview } from "./component-preview"
import { Preview } from "./component-preview"
import { DividedComponent } from "./devided-component"
import { Github } from "components/media-and-icons"
import { NextLinkIconButton } from "components/navigation"
import { CONSTANT } from "constant"
import type { ComponentMetadata } from "types"

type Context = {
  direction: ResizableProps["direction"]
  setDirectionResizable: () => void
  showCode: boolean
  showCodeToggle: () => void
}

const Context = createContext<Context>({
  direction: "vertical",
  setDirectionResizable: () => null,
  showCode: true,
  showCodeToggle: () => null,
})

export const useDetail = () => {
  return useContext(Context)
}

type Props = ComponentProps<typeof ComponentPreview> & {
  metadata: ComponentMetadata
}

export const DetailComponent: FC<Props> = ({ component, path }) => {
  const [showCode, showCodeControl] = useBoolean(true)
  const [direction, setDirection] =
    useState<ResizableProps["direction"]>("vertical")

  const setDirectionResizable = () => {
    setDirection((props) =>
      props === "horizontal" ? "vertical" : "horizontal",
    )
  }

  return (
    <Context.Provider
      value={{
        direction,
        setDirectionResizable,
        showCode,
        showCodeToggle: showCodeControl.toggle,
      }}
    >
      <Box>
        <Header path={path} />
        <Resizable
          h="100vh"
          rounded="md"
          borderWidth="1px"
          direction={direction}
        >
          <ResizableItem>
            <Preview path={path} />
          </ResizableItem>
          <ResizableTrigger />
          {showCode ? (
            <ResizableItem>
              <Box position="relative">
                <Code component={component} />
              </Box>
            </ResizableItem>
          ) : null}
        </Resizable>
      </Box>
    </Context.Provider>
  )
}

type HeaderProps = {
  path: string
}

const Header: FC<HeaderProps> = ({ path }) => {
  const { setDirectionResizable, showCodeToggle, showCode } = useDetail()
  const router = useRouter()

  return (
    <HStack
      w="full"
      p="3"
      justify="space-between"
      borderBottom={1}
      borderColor="white"
      borderStyle="solid"
    >
      <button onClick={() => router.back()}>back</button>
      <Box gap={2} display="flex">
        <NextLinkIconButton
          href={`${CONSTANT.SNS.GITHUB.YAMADA_COMPONENTS}/blob/dev/contents/${path}`}
          isExternal
          aria-label="Discord server"
          variant="ghost"
          color="muted"
          icon={<Github />}
        />
        <button onClick={setDirectionResizable}>directon</button>
        {!showCode ? <button onClick={showCodeToggle}>code</button> : null}
      </Box>
    </HStack>
  )
}

type CodeProps = Pick<ComponentProps<typeof DetailComponent>, "component">

const Code: FC<CodeProps> = ({ component }) => {
  const { showCodeToggle } = useDetail()

  return (
    <Box display="flex" alignItems="baseline">
      <DividedComponent component={component} />
      <ui.button ml={-14} onClick={showCodeToggle}>
        code
      </ui.button>
    </Box>
  )
}
