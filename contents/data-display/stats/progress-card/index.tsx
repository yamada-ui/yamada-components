import { Card, CardBody, Progress, Text } from "@yamada-ui/react"

const ProgressCard = () => {
  return (
    <Card variant="outline" maxW="lg" textAlign="start" w="full">
      <CardBody gap="0" p="lg">
        <Text color="gray" fontSize="xs" fontWeight={700}>
          MONTHLY GOAL
        </Text>
        <Text fontSize="lg" fontWeight={500}>
          $5,431 / $10,000
        </Text>
        <Progress size="lg" borderRadius="xl" mt="md" value={54.31} />
      </CardBody>
    </Card>
  )
}

export default ProgressCard
