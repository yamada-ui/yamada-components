import { Flex, Pagination } from "@yamada-ui/react"
import type { FC } from "react"

const CenteredFullWidth: FC = () => {
  return (
    <Flex justifyContent="center">
      <Pagination size={{ base: "md", sm: "sm" }} w="full" total={10} />
    </Flex>
  )
}

export default CenteredFullWidth
