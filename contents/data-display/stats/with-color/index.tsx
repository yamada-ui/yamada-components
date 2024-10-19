import { Card, CardBody, Progress, Text } from "@yamada-ui/react"

const ProgressCard = () => {
  return (
    <Card variant="outline" bg="primary" maxW="lg" textAlign="start" w="full">
      <CardBody gap="0" p="lg">
        <Text color="whiteAlpha.700" fontSize="xs" fontWeight={700}>
          MONTHLY GOAL
        </Text>
        <Text color="white" fontSize="lg" fontWeight={500}>
          $5,431 / $10,000
        </Text>
        <Progress
          size="lg"
          borderRadius="xl"
          filledTrackColor="white"
          mt="md"
          value={54.31}
        />
      </CardBody>
    </Card>
  )
}

export default ProgressCard
