import { Card, Progress, Text } from "@yamada-ui/react"

const ProgressCard = () => {
  return (
    <Card padding="xl" textAlign="start">
      <Text fontSize="xs" fontWeight={700} color="gray">
        MONTHLY GOAL
      </Text>
      <Text fontSize="lg" fontWeight={500}>
        $5.431 / $10.000
      </Text>
      <Progress value={54.31} mt="md" size="lg" borderRadius="xl" />
    </Card>
  )
}

export default ProgressCard
