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

const mockDatas = [
  {
    content: "Solve 5 question",
    current: 5,
    max: 5,
  },
  {
    content: "Solve 10 question",
    current: 10,
    max: 10,
  },
  {
    content: "Solve 15 question",
    current: 12,
    max: 15,
  },
]

const QuestProgress: FC = () => {
  return (
    <Container m="auto">
      <Heading>Daily Quests</Heading>
      <HStack justifyContent="end">
        <Text>Time remaining：12hours</Text>
      </HStack>
      {mockDatas.map((data, i) => (
        <Card flexDir="row" key={`${data.content}-${i}`}>
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
                <CircleCheckBigIcon size="6xl" />
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
