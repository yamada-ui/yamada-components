import type { FC } from "react"
import { Box, Center, CloseButton, Link, Text } from "@yamada-ui/react"

const Announcement: FC = () => {
  return (
    <Box
      bgGradient="linear(to-l, primary.500, secondary.500)"
      position="fixed"
      top="0"
      w="full"
    >
      <Center>
        <Text size="sm" color="white" fontWeight="500" isTruncated padding="3">
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
        bottom="0"
        color="white"
        m="auto"
        position="absolute"
        right="sm"
        top="0"
      />
    </Box>
  )
}

export default Announcement
