import type { HTMLUIProps } from "@yamada-ui/react"
import { Box, Pagination, Text, ui } from "@yamada-ui/react"
import { useState, type FC } from "react"

const SimpleButton: FC = () => {
  const [page, onChange] = useState<number>(1)

  const buttonStyles: HTMLUIProps<"button"> = {
    p: "sm",
    w: 20,
    display: "flex",
    justifyContent: "center",
  }

  return (
    <Box>
      <Pagination
        page={page}
        onChange={onChange}
        total={10}
        justifyContent="center"
        innerProps={{ display: "none" }}
        controlPrevProps={{
          children: "Prev",
          ...buttonStyles,
        }}
        controlNextProps={{
          children: "Next",
          ...buttonStyles,
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
