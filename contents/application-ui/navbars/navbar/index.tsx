import { Box } from "@yamada-ui/react"
import type { FC } from "react"
import type { ComponentMetadata } from "types"

const NavBar: FC = () => {
  return <Box as="nav">Nav</Box>
}

export default NavBar

export const metadata: ComponentMetadata = {
  title: "Simple Navbar",
  description: "This is simple navbar component.",
}
