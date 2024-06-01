import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Tag,
  Text,
  VStack,
  Wrap,
} from "@yamada-ui/react"
import { useState, type FC } from "react"

const CardWithTags: FC = () => {
  const defaultTags = [
    {
      name: "bug",
      color: "red",
    },
    {
      name: "enhancement",
      color: "blue",
    },
    {
      name: "good first issue",
      color: "green",
    },
  ]
  const [tags, setTags] = useState(defaultTags)
  return (
    <VStack>
      <Card variant="outline">
        <CardHeader>
          <Heading as="h3" size="lg">
            Issue #133
          </Heading>
        </CardHeader>
        <CardBody>
          <Text>Labels:</Text>
          <Wrap gap="sm">
            {tags.length > 0 ? (
              tags.map((tag, index) => (
                <Tag
                  key={tag.name}
                  onClose={() =>
                    setTags((prev) => [
                      ...prev.slice(0, index),
                      ...prev.slice(index + 1),
                    ])
                  }
                  colorScheme={tag.color}
                >
                  {tag.name}
                </Tag>
              ))
            ) : (
              <Text>None</Text>
            )}
          </Wrap>
        </CardBody>
      </Card>
      <Button
        onClick={() => setTags(defaultTags)}
        colorScheme="primary"
        variant="ghost"
      >
        Reset to default
      </Button>
    </VStack>
  )
}

export default CardWithTags
