import type { FC } from "react"
import type { ComponentMetadata } from "types"

declare module "react" {
  type CFC = FC<{ metadata: ComponentMetadata }>
}
