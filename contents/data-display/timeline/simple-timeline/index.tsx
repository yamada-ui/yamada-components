import { VStack, Divider, List, ListItem } from "@yamada-ui/react"
import type { FC } from "react"
import { items } from "./timeline"
import { TimelineItem } from "./timeline-item"

const SimpleTimeline: FC = () => {
  return (
    <VStack as={List} position="relative" gap="xl" pl={{ base: "lg", sm: "0" }}>
      <ListItem>
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
      </ListItem>
      {items.map((item, index) => (
        <TimelineItem key={index} {...item} />
      ))}
    </VStack>
  )
}

export default SimpleTimeline
