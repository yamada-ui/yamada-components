import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Badge,
  Text,
  ListItem,
} from "@yamada-ui/react"
import type { FC } from "react"

interface TimelineItemProps {
  date: string
  title: string
  description: string
}

export const TimelineItem: FC<TimelineItemProps> = ({
  date,
  title,
  description,
}) => (
  <Card
    as={ListItem}
    variant="subtle"
    position="relative"
    maxW="xl"
    bg="transparent"
    pt="sm"
    gap="sm"
  >
    <Badge position="absolute" top="0" left="md" colorScheme="primary">
      {date}
    </Badge>
    <Box
      position="absolute"
      left="-2.05rem"
      top="15%"
      transform="translateY(-50%)"
      bg="primary"
      fontSize="24"
      rounded="full"
      w="3"
      h="3"
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
