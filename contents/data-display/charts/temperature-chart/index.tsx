import { LineChart } from "@yamada-ui/charts"
import { Container, Heading, useAsync } from "@yamada-ui/react"
import { type FC } from "react"

const TemperatureChart: FC = () => {
  const { value } = useAsync(async () => {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=35.6785,34.6937,43.0642,26.2124&longitude=139.6823,135.5023,141.3468,127.6792&hourly=temperature_2m&timezone=Asia%2FTokyo",
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
          if (!acc[i]) acc[i] = { date: time } as Record<string, any>
          acc[i][locationKey] = region.hourly.temperature_2m[i]
        })
        return acc
      },
      [] as Array<Record<string, any>>,
    )

    return formattedData
  })

  return (
    <Container m="auto">
      <Heading>This is a Temperature chart.</Heading>
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
