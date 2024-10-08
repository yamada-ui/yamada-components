import { Text, Pagination, Flex, Box, ui } from "@yamada-ui/react"
import { useState, type FC } from "react"

const RightJustifiedWithPagePosition: FC = () => {
  const [page, onChange] = useState<number>(1)

  return (
    <Box w="full">
      <Flex justifyContent={{ base: "end", sm: "center" }}>
        <Pagination
          page={page}
          onChange={onChange}
          total={10}
          w="md"
          size={{ base: "md", sm: "sm", xs: "xs" }}
          variant="ghost"
        />
      </Flex>
      <Text
        fontSize="sm"
        color={["gray.700", "gray.200"]}
        textAlign="right"
        m="md"
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
