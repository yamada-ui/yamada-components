import type { FC } from "react"
import { Heading } from "@yamada-ui/react"

const FullGradientHeading: FC = () => {
  return (
    <Heading bgClip="text" bgGradient="linear(to-l, #7928CA, #FF0080)">
      Full gradient heading using Yamada UI and background gradient.
    </Heading>
  )
}

export default FullGradientHeading
