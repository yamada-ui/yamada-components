import type { FC, PropsWithChildren } from "react"
import { SEO } from "components/media-and-icons"

type ComponentLayoutOptions = { title: string; description: string }

export type ComponentLayoutProps = PropsWithChildren & ComponentLayoutOptions

export const ComponentLayout: FC<ComponentLayoutProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <>
      <SEO title={title} description={description} />

      {children}
    </>
  )
}
