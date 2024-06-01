import { Heading } from "@yamada-ui/react"
import type { FC } from "react"

const PartialGradient: FC = () => {
  return (
    <Heading>
      Full gradient heading using{" "}
      <Heading
        as="span"
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
      >
        Yamada UI
      </Heading>{" "}
      and background gradient.
    </Heading>
  )
}

export default PartialGradient
