import { LineChart } from "@yamada-ui/charts"
import { Button, Container, Heading, HStack, useAsync } from "@yamada-ui/react"
import { useState, type FC } from "react"

const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const day = date.getDate().toString().padStart(2, "0")
  return `${year}-${month}-${day}`
}

const TemperatureChart: FC = () => {
  const [startDate, setStartDate] = useState(new Date())

  const { value } = useAsync(async () => {
    const endDate = new Date(startDate)
    endDate.setDate(startDate.getDate() - 7)
    const startDateString = formatDate(startDate)
    const endDateString = formatDate(endDate)

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=35.6785,34.6937,43.0642,26.2124&longitude=139.6823,135.5023,141.3468,127.6792&hourly=temperature_2m&timezone=Asia%2FTokyo&start_date=${endDateString}&end_date=${startDateString}`,
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

    const formattedData = data.reduce(
      (acc, region, index) => {
        let locationKey: string
        switch (index) {
          case 0:
            locationKey = "Tokyo"
            break
          case 1:
            locationKey = "Osaka"
            break
          case 2:
            locationKey = "Hokkaido"
            break
          case 3:
            locationKey = "Okinawa"
            break
          default:
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

  return (
    <Container m="auto">
      <Heading>This is a Temperature chart.</Heading>
      <HStack>
        <Button onClick={handlePreviousWeek}>Previous Week</Button>
        <Button onClick={handleNextWeek}>Next Week</Button>
      </HStack>
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
    </Container>
  )
}

export default TemperatureChart
