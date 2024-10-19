import type { FC } from "react"
import { CircleCheckBigIcon } from "@yamada-ui/lucide"
import {
  Card,
  CardBody,
  CardHeader,
  Center,
  Container,
  Heading,
  HStack,
  Progress,
  Text,
  VStack,
} from "@yamada-ui/react"

const mockData = [
  {
    content: "Solve 5 questions",
    current: 5,
    max: 5,
  },
  {
    content: "Solve 10 questions",
    current: 10,
    max: 10,
  },
  {
    content: "Solve 15 questions",
    current: 12,
    max: 15,
  },
]

const QuestProgress: FC = () => {
  return (
    <Container>
      <Heading>Daily Quests</Heading>
      <HStack justifyContent="end">
        <Text>Time remaining: 12 hours</Text>
      </HStack>
      {mockData.map((data, i) => (
        <Card key={`${data.content}-${i}`} variant="subtle" flexDir="row">
          <VStack gap="0">
            <CardHeader fontSize="lg">
              {i + 1}. {data.content}
            </CardHeader>
            <CardBody>
              <Progress
                colorScheme="primary"
                borderRadius="3xl"
                h="7"
                hasStripe
                isStripeAnimation
                position="relative"
                value={(data.current / data.max) * 100}
                _after={{
                  content: `"${data.current}/${data.max}"`,
                  left: "50%",
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%) translateX(-50%)",
                }}
              />
            </CardBody>
          </VStack>
          <Center flexDir="column" w="32">
            {data.current >= data.max ? (
              <>
                <CircleCheckBigIcon fontSize="6xl" />
                <Text>Clear!!</Text>
              </>
            ) : undefined}
          </Center>
        </Card>
      ))}
    </Container>
  )
}

export default QuestProgress
