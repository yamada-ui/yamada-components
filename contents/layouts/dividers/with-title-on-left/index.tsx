import { HStack, Divider, Heading } from "@yamada-ui/react"
import type { FC } from "react"

const WithTitleOnLeft: FC = () => {
  return (
    <HStack>
      <Heading as="h3" size="sm">
        Projects
      </Heading>
      <Divider />
    </HStack>
  )
}

export default WithTitleOnLeft
