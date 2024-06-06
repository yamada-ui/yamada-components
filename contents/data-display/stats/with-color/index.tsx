import { Card, CardBody, Progress, Text } from "@yamada-ui/react"

const ProgressCard = () => {
  return (
    <Card textAlign="start" variant="outline" w="full" maxW="lg" bg="primary">
      <CardBody gap="0" p="lg">
        <Text fontSize="xs" fontWeight={700} color="whiteAlpha.700">
          MONTHLY GOAL
        </Text>
        <Text fontSize="lg" fontWeight={500} color="white">
          $5,431 / $10,000
        </Text>
        <Progress
          value={54.31}
          mt="md"
          size="lg"
          borderRadius="xl"
          filledTrackColor="white"
        />
      </CardBody>
    </Card>
  )
}

export default ProgressCard
