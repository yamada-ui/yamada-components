import { Box, Link, CloseButton, HStack, Text } from "@yamada-ui/react"
import type { FC } from "react"

const Announcement: FC = () => {
  return (
    <Box
      bgGradient="linear(to-l, #7928CA, #FF0080)"
      w="full"
      position="fixed"
      top="0"
      left="0"
    >
      <HStack justifyContent="space-between">
        <Text
          size="sm"
          padding="10px"
          color="white"
          marginLeft="30%"
          fontWeight="500"
          isTruncated
        >
          Yamada UI Con 20xx is on June 7th in Online.{" "}
          <Link href="#" color="white" fontWeight="bold">
            Get your ticket →
          </Link>
        </Text>
        <CloseButton color="white" marginRight="1%" />
      </HStack>
    </Box>
  )
}

export default Announcement
