import { Text, Pagination, Flex, Box } from "@yamada-ui/react"
import { useState, type FC } from "react"

const RightJustifiedWithPagePosition: FC = () => {
  const [page, onChange] = useState<number>(1)

  return (
    <Box>
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
        mt="md"
      >
        Showing {page * 10 - 9}-{page * 10} of 100
      </Text>
    </Box>
  )
}

export default RightJustifiedWithPagePosition
