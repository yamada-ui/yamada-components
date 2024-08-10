import { LineChart } from "@yamada-ui/charts"
import { ChevronLeftIcon, ChevronRightIcon } from "@yamada-ui/lucide"
import {
  Center,
  Container,
  Heading,
  HStack,
  IconButton,
  Loading,
  Text,
  useAsync,
} from "@yamada-ui/react"
import { useState, type FC } from "react"

const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const day = date.getDate().toString().padStart(2, "0")
  return `${year}-${month}-${day}`
}

const WeeklyTemperatureChart: FC = () => {
  const [startDate, setStartDate] = useState(new Date())
  const [isPreviousDisabled, setIsPreviousDisabled] = useState(false)
  const [isNextDisabled, setIsNextDisabled] = useState(false)

  const { value, loading } = useAsync(async () => {
    const today = new Date()
    const twoWeeksAhead = new Date()
    twoWeeksAhead.setDate(today.getDate() + 13)
    const fourMonthsAgo = new Date()
    fourMonthsAgo.setMonth(today.getMonth() - 3)

    setIsNextDisabled(startDate > twoWeeksAhead)
    setIsPreviousDisabled(startDate < fourMonthsAgo)

    const endDate = new Date(startDate)
    endDate.setDate(startDate.getDate() - 7)
    const startDateString = formatDate(endDate)
    const endDateString = formatDate(startDate)

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=35.6785,34.6937,43.0642,26.2124&longitude=139.6823,135.5023,141.3468,127.6792&hourly=temperature_2m&timezone=Asia%2FTokyo&start_date=${startDateString}&end_date=${endDateString}`,
      { cache: "force-cache" },
    )

    const data = (await response.json()) as Array<{
      latitude: number
      longitude: number
      hourly: {
        time: string[]
        temperature_2m: number[]
      }
    }>

    const locationKeys = ["Tokyo", "Osaka", "Hokkaido", "Okinawa"]

    const formattedData = data.reduce(
      (acc, region, index) => {
        const locationKey = locationKeys[index]
        if (!locationKey) {
          throw new Error("Unexpected location index")
        }
        region.hourly.time.forEach((time, i) => {
          const formattedTime = time.replace("T", " ")
          if (!acc[i]) acc[i] = { date: formattedTime } as Record<string, any>
          acc[i][locationKey] = region.hourly.temperature_2m[i]
        })
        return acc
      },
      [] as Array<Record<string, any>>,
    )

    return formattedData
  }, [startDate])

  const handlePreviousWeek = () => {
    setStartDate((prevDate) => {
      const newDate = new Date(prevDate)
      newDate.setDate(prevDate.getDate() - 7)
      return newDate
    })
  }

  const handleNextWeek = () => {
    setStartDate((prevDate) => {
      const newDate = new Date(prevDate)
      newDate.setDate(prevDate.getDate() + 7)
      return newDate
    })
  }

  const endDate = new Date(startDate)
  endDate.setDate(startDate.getDate() - 7)
  const startDateString = formatDate(endDate)
  const endDateString = formatDate(startDate)

  return (
    <Container m="auto" maxW="container.md" p={4}>
      <Heading mb={6}>Weekly Temperature Chart</Heading>
      <HStack mb={4} justifyContent="center">
        <IconButton
          onClick={handlePreviousWeek}
          isDisabled={isPreviousDisabled}
          icon={<ChevronLeftIcon />}
        />
        <Text>{`${startDateString} 〜 ${endDateString}`}</Text>
        <IconButton
          onClick={handleNextWeek}
          isDisabled={isNextDisabled}
          icon={<ChevronRightIcon />}
        />
      </HStack>
      {loading ? (
        <Center height="md">
          <Loading boxSize="5xs" />
        </Center>
      ) : (
        <LineChart
          data={value ? value : []}
          series={[
            { dataKey: "Tokyo", color: "red" },
            { dataKey: "Osaka", color: "green" },
            { dataKey: "Hokkaido", color: "blue" },
            { dataKey: "Okinawa", color: "purple" },
          ]}
          dataKey="date"
          withDots={false}
          withActiveDots={false}
          unit="°C"
        />
      )}
    </Container>
  )
}

export default WeeklyTemperatureChart
