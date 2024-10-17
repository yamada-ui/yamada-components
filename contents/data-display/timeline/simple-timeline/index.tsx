import type { FC } from "react"
import { Divider, List, ListItem, VStack } from "@yamada-ui/react"
import { items } from "./timeline"
import { TimelineItem } from "./timeline-item"

const SimpleTimeline: FC = () => {
  return (
    <VStack as={List} gap="xl" pl={{ base: "lg", sm: "0" }} position="relative">
      <ListItem>
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
      </ListItem>
      {items.map((item, index) => (
        <TimelineItem key={index} {...item} />
      ))}
    </VStack>
  )
}

export default SimpleTimeline
