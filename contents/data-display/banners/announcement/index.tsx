import { Box, Link, CloseButton, Text, Center } from "@yamada-ui/react"
import type { FC } from "react"

const Announcement: FC = () => {
  return (
    <Box
      bgGradient="linear(to-l, primary.500, secondary.500)"
      w="full"
      position="fixed"
      top="0"
    >
      <Center>
        <Text size="sm" padding="3" color="white" fontWeight="500" isTruncated>
          Yamada UI Con 20xx is on June 7th in Online.{" "}
          <Link
            href="#"
            color="white"
            fontWeight="bold"
            onClick={(e) => e.preventDefault()}
          >
            Get your ticket →
          </Link>
        </Text>
      </Center>
      <CloseButton
        color="white"
        position="absolute"
        top="0"
        bottom="0"
        right="sm"
        m="auto"
      />
    </Box>
  )
}

export default Announcement
