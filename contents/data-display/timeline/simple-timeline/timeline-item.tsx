import type { FC } from "react"
import {
  Badge,
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  ListItem,
  Text,
} from "@yamada-ui/react"

interface TimelineItemProps {
  date: string
  description: string
  title: string
}

export const TimelineItem: FC<TimelineItemProps> = ({
  date,
  description,
  title,
}) => (
  <Card
    as={ListItem}
    variant="subtle"
    bg="transparent"
    gap="sm"
    maxW="xl"
    position="relative"
    pt="sm"
  >
    <Badge colorScheme="primary" left="md" position="absolute" top="0">
      {date}
    </Badge>
    <Box
      bg="primary"
      fontSize="24"
      h="3"
      left="-2.05rem"
      position="absolute"
      rounded="full"
      top="15%"
      transform="translateY(-50%)"
      w="3"
    />
    <CardHeader>
      <Heading as="h3" fontSize="lg">
        {title}
      </Heading>
    </CardHeader>
    <CardBody py="0">
      <Text>{description}</Text>
    </CardBody>
  </Card>
)
