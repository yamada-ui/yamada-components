import { CircleCheckBigIcon } from "@yamada-ui/lucide"
import {
  Card,
  CardBody,
  CardHeader,
  Center,
  Container,
  HStack,
  Heading,
  Progress,
  Text,
  VStack,
} from "@yamada-ui/react"
import type { FC } from "react"

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
        <Card flexDir="row" key={`${data.content}-${i}`} variant="subtle">
          <VStack>
            <CardHeader fontSize="lg">
              {i + 1}. {data.content}
            </CardHeader>
            <CardBody>
              <Progress
                hasStripe
                isStripeAnimation
                colorScheme="primary"
                position="relative"
                _after={{
                  content: `"${data.current}/${data.max}"`,
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translateY(-50%) translateX(-50%)",
                }}
                value={(data.current / data.max) * 100}
                h="7"
              />
            </CardBody>
          </VStack>
          <Center w="32" flexDir="column">
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
