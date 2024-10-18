import type { FC } from "react"
import { Box, Flex, Pagination, Text, ui } from "@yamada-ui/react"
import { useState } from "react"

const RightJustifiedWithPagePosition: FC = () => {
  const [page, onChange] = useState<number>(1)

  return (
    <Box w="full">
      <Flex justifyContent={{ base: "end", sm: "center" }}>
        <Pagination
          size={{ base: "md", xs: "xs", sm: "sm" }}
          variant="ghost"
          page={page}
          total={10}
          w="md"
          onChange={onChange}
        />
      </Flex>
      <Text
        color={["gray.700", "gray.200"]}
        fontSize="sm"
        m="md"
        textAlign="right"
      >
        Showing{" "}
        <ui.span display="inline-block" minWidth="20px" textAlign="center">
          {page * 10 - 9}
        </ui.span>
        -
        <ui.span display="inline-block" minWidth="30px" textAlign="center">
          {page * 10}
        </ui.span>{" "}
        of 100
      </Text>
    </Box>
  )
}

export default RightJustifiedWithPagePosition
