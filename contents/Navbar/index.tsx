import { Box } from "@yamada-ui/react"
import type { FC } from "react"

const NavBar: FC = () => {
  return <Box as="nav">Nav</Box>
}

export default NavBar

export const metadata = {
  title: "Simple Navbar",
  category: "navbars",
  canvas: {
    center: true,
    maxWidth: 420,
  },
}
