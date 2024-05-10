import type { ResizableProps } from "@yamada-ui/react"
import { useDisclosure } from "@yamada-ui/react"
import { useState, type FC } from "react"
import { ComponentBody, ComponentHeader } from "components/layouts"
import { SEO } from "components/media-and-icons"

export type CodeDirection = ResizableProps["direction"]

type ComponentLayoutOptions = {
  title: string
  description: string
}

export type ComponentLayoutProps = ComponentLayoutOptions

export const ComponentLayout: FC<ComponentLayoutProps> = ({
  title,
  description,
}) => {
  const codeControls = useDisclosure()
  const [codeDirection, setCodeDirection] = useState<CodeDirection>("vertical")

  return (
    <>
      <SEO title={title} description={description} />

      <ComponentHeader {...{ codeDirection, codeControls }} />

      <ComponentBody {...{ codeDirection, setCodeDirection, codeControls }} />
    </>
  )
}
