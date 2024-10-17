import type { FC } from "react"
import {
  Card,
  CardBody,
  CardHeader,
  Center,
  Heading,
  HStack,
  ListItem,
  Tag,
  Text,
  VStack,
} from "@yamada-ui/react"
import { CalendarIcon } from "./calendar-icon"

interface TimelineItemProps {
  date: string
  description: string
  title: string
  latest?: boolean
}

export const TimelineItem: FC<TimelineItemProps> = ({
  date,
  description,
  latest = false,
  title,
}) => (
  <Card
    as={ListItem}
    variant="subtle"
    bg="transparent"
    gap="sm"
    maxW="xl"
    position="relative"
  >
    <Center
      bg={["white", "black"]}
      fontSize="24"
      h="6"
      left="-2.5rem"
      position="absolute"
      rounded="full"
      top="8"
      transform="translateY(-50%)"
      w="6"
      _after={{
        bg: "primary",
        content: { base: '""', sm: undefined },
        height: "6",
        opacity: 0.5,
        position: "absolute",
        rounded: "full",
        width: "6",
      }}
    >
      <CalendarIcon fontSize="xs" />
    </Center>
    <CardHeader pt="md">
      <VStack gap="0">
        <HStack>
          <Heading as="h3" fontSize="lg">
            {title}
          </Heading>
          {latest ? <Tag>Latest</Tag> : null}
        </HStack>
        <Text as="time" color="muted" fontSize="sm" fontWeight="semibold">
          {date}
        </Text>
      </VStack>
    </CardHeader>
    <CardBody pb="md" pt="0">
      <Text>{description}</Text>
    </CardBody>
  </Card>
)
