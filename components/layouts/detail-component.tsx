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
import { Preview } from "./component-preview"
import { DividedComponent } from "./devided-component"
import { Github } from "components/media-and-icons"
import { NextLinkIconButton } from "components/navigation"
import { CONSTANT } from "constant"
import { useI18n } from "contexts/i18n-context"
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

type Props = {
  component: ComponentProps<typeof DividedComponent>["component"]
  path: string
  metadata: ComponentMetadata
  isDisableBackBtn?: boolean
}

export const DetailComponent: FC<Props> = ({
  component,
  path,
  isDisableBackBtn,
}) => {
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
        <Header
          path={path}
          direction={direction}
          isDisableBackBtn={isDisableBackBtn}
        />
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
  direction: "vertical" | "horizontal"
  isDisableBackBtn: boolean
}

const Header: FC<HeaderProps> = ({ path, direction, isDisableBackBtn }) => {
  const { setDirectionResizable, showCodeToggle, showCode } = useDetail()
  const router = useRouter()
  const { t } = useI18n()

  return (
    <HStack
      w="full"
      p="3"
      justify="space-between"
      borderBottom={1}
      borderColor="white"
      borderStyle="solid"
    >
      <button
        onClick={() => router.back()}
        style={{ visibility: isDisableBackBtn ? "hidden" : "visible" }}
      >
        {t("component.component-preview.back")}
      </button>
      <Box gap={2} display="flex">
        <NextLinkIconButton
          href={`${CONSTANT.SNS.GITHUB.YAMADA_COMPONENTS}/blob/dev/contents/${path}`}
          isExternal
          aria-label="Discord server"
          variant="ghost"
          color="muted"
          icon={<Github />}
        />
        <button onClick={setDirectionResizable}>
          {direction === "horizontal"
            ? t("component.component-preview.direction.horizontal")
            : t("component.component-preview.direction.vertical")}
        </button>
        {!showCode ? (
          <button onClick={showCodeToggle}>
            {t("component.component-preview.code.open")}
          </button>
        ) : null}
      </Box>
    </HStack>
  )
}

type CodeProps = Pick<ComponentProps<typeof DetailComponent>, "component">

const Code: FC<CodeProps> = ({ component }) => {
  const { showCodeToggle } = useDetail()
  const { t } = useI18n()

  return (
    <Box display="flex" alignItems="baseline">
      <DividedComponent component={component} />
      <ui.button ml={-14} onClick={showCodeToggle}>
        {t("component.component-preview.code.close")}
      </ui.button>
    </Box>
  )
}
