import { RangeDatePicker } from "@yamada-ui/calendar"
import { LineChart } from "@yamada-ui/charts"
import { Center, Container, Heading, Loading, useAsync } from "@yamada-ui/react"
import { useState, type FC } from "react"

const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const day = date.getDate().toString().padStart(2, "0")
  return `${year}-${month}-${day}`
}

const WeeklyTemperatureChart: FC = () => {
  const today = new Date()
  const nextWeek = new Date()
  nextWeek.setDate(today.getDate() + 6)

  const pastThreeMonths = new Date()
  pastThreeMonths.setMonth(today.getMonth() - 3)

  const futureTwoWeeks = new Date()
  futureTwoWeeks.setDate(today.getDate() + 13)

  const [dateRange, setDateRange] = useState<
    [(Date | undefined)?, (Date | undefined)?]
  >([today, nextWeek])

  const { value, loading } = useAsync(async () => {
    if (!dateRange[0] || !dateRange[1]) return []

    const startDateString = formatDate(dateRange[0])
    const endDateString = formatDate(dateRange[1])

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
          if (!acc[i])
            acc[i] = { date: formattedTime } as Record<string, number | string>
          acc[i][locationKey] = region.hourly.temperature_2m[i]
        })
        return acc
      },
      [] as Array<Record<string, number | string>>,
    )

    return formattedData
  }, [dateRange])

  return (
    <Container m="auto" maxW="md">
      <Heading>Weekly Temperature Chart</Heading>
      <Center gap="md">
        <RangeDatePicker
          placeholder="YYYY/MM/DD"
          minDate={pastThreeMonths}
          maxDate={futureTwoWeeks}
          value={dateRange}
          onChange={setDateRange}
        />
      </Center>
      {loading || value?.length === 0 ? (
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
