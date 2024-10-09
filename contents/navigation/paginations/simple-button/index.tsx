import type { FC } from "react"
import { Box, Button, Pagination, Text, ui } from "@yamada-ui/react"
import { useState } from "react"

const SimpleButton: FC = () => {
  const [page, onChange] = useState<number>(1)

  return (
    <Box>
      <Pagination
        justifyContent="center"
        page={page}
        total={10}
        controlNextProps={{
          children: (
            <Button size="sm" variant="ghost">
              Next
            </Button>
          ),
        }}
        controlPrevProps={{
          children: (
            <Button size="sm" variant="ghost">
              Prev
            </Button>
          ),
        }}
        innerProps={{ display: "none" }}
        onChange={onChange}
      />
      <Text
        color={["gray.700", "gray.200"]}
        fontSize="sm"
        mt="md"
        textAlign="right"
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
