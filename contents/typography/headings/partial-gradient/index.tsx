import type { FC } from "react"
import { Heading } from "@yamada-ui/react"

const PartialGradient: FC = () => {
  return (
    <Heading>
      Full gradient heading using{" "}
      <Heading
        as="span"
        bgClip="text"
        bgGradient="linear(to-l, #7928CA, #FF0080)"
      >
        Yamada UI
      </Heading>{" "}
      and background gradient.
    </Heading>
  )
}

export default PartialGradient
