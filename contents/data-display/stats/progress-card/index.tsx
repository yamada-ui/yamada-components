import { Card, CardBody, Progress, Text } from "@yamada-ui/react"

const ProgressCard = () => {
  return (
    <Card textAlign="start" variant="outline" maxW="lg" mx="auto">
      <CardBody gap="0" p="lg">
        <Text fontSize="xs" fontWeight={700} color="gray">
          MONTHLY GOAL
        </Text>
        <Text fontSize="lg" fontWeight={500}>
          $5,431 / $10,000
        </Text>
        <Progress value={54.31} mt="md" size="lg" borderRadius="xl" />
      </CardBody>
    </Card>
  )
}

export default ProgressCard
