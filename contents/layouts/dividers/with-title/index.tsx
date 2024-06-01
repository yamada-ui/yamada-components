import { HStack, Divider, Heading } from "@yamada-ui/react"
import type { FC } from "react"

const WithLabel: FC = () => {
  return (
    <HStack>
      <Divider />
      <Heading as="h3" size="sm">
        Projects
      </Heading>
      <Divider />
    </HStack>
  )
}

export default WithLabel
