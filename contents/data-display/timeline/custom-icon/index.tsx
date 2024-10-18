import type { FC } from "react"
import { Divider, List, VStack } from "@yamada-ui/react"
import { items } from "./timeline"
import { TimelineItem } from "./timeline-item"

const CustomIconTimeline: FC = () => {
  return (
    <VStack as={List} pl={{ base: "lg", sm: "0" }} position="relative">
      <Divider
        borderColor="primary"
        bottom="0"
        display={{ sm: "none" }}
        left="xs"
        orientation="vertical"
        position="absolute"
        top="0"
        w="1px"
      />
      {items.map((item, index) => (
        <TimelineItem
          key={index}
          latest={index === items.length - 1}
          {...item}
        />
      ))}
    </VStack>
  )
}

export default CustomIconTimeline
