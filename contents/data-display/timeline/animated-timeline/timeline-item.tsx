import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  Center,
  VStack,
  HStack,
  Tag,
} from "@yamada-ui/react"
import type { FC } from "react"
import { CalendarIcon } from "./calendar-icon"

interface TimelineItemProps {
  date: string
  title: string
  description: string
  latest?: boolean
  side: "left" | "right"
}

export const TimelineItem: FC<TimelineItemProps> = ({
  date,
  title,
  description,
  latest = false,
  side,
}) => (
  <Card
    position="relative"
    maxW="md"
    gap="sm"
    placeSelf={side === "right" ? "flex-end" : undefined}
  >
    <Center
      position="absolute"
      top="8"
      transform="translateY(-50%)"
      _after={{
        display: { base: "block", sm: "none" },
        position: "absolute",
        height: "6",
        width: "6",
        bg: "primary",
        opacity: 0.5,
        rounded: "full",
      }}
      bg={["white", "black"]}
      fontSize="24"
      rounded="full"
      w="6"
      h="6"
      right={{ base: side === "left" ? "-3.75rem" : undefined, lg: undefined }}
      left={{ base: side === "right" ? "-3.9rem" : undefined, lg: "-3.9rem" }}
      display={{ base: "flex", sm: "none" }}
    >
      <CalendarIcon fontSize="xs" />
    </Center>
    <CardHeader pt="md">
      <VStack gap="0">
        <HStack>
          <Heading as="h3" fontSize="lg">
            {title}
          </Heading>
          {latest && <Tag>Latest</Tag>}
        </HStack>
        <Text as="time" color="muted" fontWeight="semibold" fontSize="sm">
          {date}
        </Text>
      </VStack>
    </CardHeader>
    <CardBody pt="0" pb="md">
      <Text>{description}</Text>
    </CardBody>
  </Card>
)
