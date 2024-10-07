import { Box, Button, Pagination, Text, ui } from "@yamada-ui/react"
import { useState, type FC } from "react"

const SimpleButton: FC = () => {
  const [page, onChange] = useState<number>(1)

  return (
    <Box>
      <Pagination
        page={page}
        onChange={onChange}
        total={10}
        justifyContent="center"
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
        Showing{" "}
        <ui.span display="inline-block" minWidth="20px" textAlign="center">
          {page * 10 - 9}
        </ui.span>
        -
        <ui.span display="inline-block" minWidth="30px" textAlign="center">
          {page * 10}
        </ui.span>
        of 100
      </Text>
    </Box>
  )
}

export default SimpleButton
