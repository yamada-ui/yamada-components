import { Box, Button, Pagination, Text } from "@yamada-ui/react"
import { useState, type FC } from "react"

const SimpleButton: FC = () => {
  const [page, onChange] = useState<number>(1)

  return (
    <Box>
      <Pagination
        page={page}
        onChange={onChange}
        total={10}
        innerProps={{ display: "none" }}
        controlPrevProps={{
          children: (
            <Button variant="ghost" size="sm">
              Prev
            </Button>
          ),
        }}
        controlNextProps={{
          children: (
            <Button variant="ghost" size="sm">
              Next
            </Button>
          ),
        }}
      />
      <Text
        fontSize="sm"
        color={["gray.700", "gray.200"]}
        textAlign="right"
        mt="md"
      >
        {/* Showing {page * 10 - 9}-{page * 10} of 100 */}
        Showing{" "}
        <span
          style={{
            display: "inline-block",
            minWidth: "20px",
            textAlign: "center",
          }}
        >
          {page * 10 - 9}
        </span>
        -
        <span
          style={{
            display: "inline-block",
            minWidth: "30px",
            textAlign: "center",
          }}
        >
          {page * 10}
        </span>{" "}
        of 100
      </Text>
    </Box>
  )
}

export default SimpleButton
