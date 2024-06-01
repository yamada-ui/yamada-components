import { Heading } from "@yamada-ui/react"
import type { FC } from "react"

const FullGradientHeading: FC = () => {
  return (
    <Heading bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
      Full gradient heading using Yamada UI and background gradient.
    </Heading>
  )
}

export default FullGradientHeading
