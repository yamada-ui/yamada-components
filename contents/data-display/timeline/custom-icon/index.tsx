import { VStack, Divider, List } from "@yamada-ui/react"
import type { FC } from "react"
import { items } from "./timeline"
import { TimelineItem } from "./timeline-item"

const CustomIconTimeline: FC = () => {
  return (
    <VStack as={List} position="relative" pl={{ base: "lg", sm: "0" }}>
      <Divider
        orientation="vertical"
        position="absolute"
        bottom="0"
        left="xs"
        borderColor="primary"
        w="1px"
        display={{ sm: "none" }}
        top="0"
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
