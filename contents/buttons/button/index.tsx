import { Button as _Button } from "@yamada-ui/react"

import type { FC } from "react"

const Button: FC = () => {
  return <_Button>Button</_Button>
}

export default Button

export const metadata = {
  title: "Button",
  category: "buttons",
  canvas: {
    center: true,
    maxWidth: 420,
  },
}
