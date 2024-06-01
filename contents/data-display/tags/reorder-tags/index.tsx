import {
  Card,
  CardBody,
  CardHeader,
  Tag,
  Text,
  ReorderItem,
  Reorder,
  Avatar,
  HStack,
  Indicator,
} from "@yamada-ui/react"
import { useState, type FC } from "react"

const tags = ["red", "blue", "green", "yellow", "purple"]

const CardWithReorderTags: FC = () => {
  const [color, setColor] = useState(tags[0])

  return (
    <Card variant="outline">
      <CardHeader>
        <HStack>
          <Indicator size="lg" offset={1.5} ping colorScheme="primary">
            <Avatar src="https://avatars.githubusercontent.com/u/61367823?s=80&v=4" />
          </Indicator>
          <Text color={`${color}.400`}>taroj1205</Text>
        </HStack>
      </CardHeader>
      <CardBody flexDir="row" alignItems="center" flexWrap="wrap">
        <Text>Colors:</Text>
        <Reorder
          variant="unstyled"
          orientation="horizontal"
          w="fit-content"
          flexWrap="wrap"
          onCompleteChange={(labels) => setColor(String(labels[0]))}
          gap="sm"
        >
          {tags.map((tag) => (
            <ReorderItem key={tag} label={tag} w="fit-content">
              <Tag colorScheme={tag}>{tag}</Tag>
            </ReorderItem>
          ))}
        </Reorder>
      </CardBody>
    </Card>
  )
}

export default CardWithReorderTags
