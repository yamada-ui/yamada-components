import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  ListItem,
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
}

export const TimelineItem: FC<TimelineItemProps> = ({
  date,
  title,
  description,
  latest = false,
}) => (
  <Card
    as={ListItem}
    variant="subtle"
    position="relative"
    maxW="xl"
    bg="transparent"
    gap="sm"
  >
    <Center
      position="absolute"
      left="-2.5rem"
      top="8"
      transform="translateY(-50%)"
      _after={{
        display: "block",
        position: "absolute",
        height: "6",
        width: "6",
        bg: "primary",
        opacity: 0.5,
        rounded: "full",
        zIndex: "beerus",
      }}
      bg={["white", "black"]}
      fontSize="24"
      rounded="full"
      w="6"
      h="6"
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
