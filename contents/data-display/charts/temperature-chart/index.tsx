import { LineChart } from "@yamada-ui/charts"
import { Container, Heading, useAsync } from "@yamada-ui/react"
import { type FC } from "react"

const TemperatureChart: FC = () => {
  const { value } = useAsync(async () => {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=35.6785&longitude=139.6823&hourly=temperature_2m&timezone=Asia%2FTokyo",
      { cache: "force-cache" },
    )
    const { hourly } = await response.json()
    const { time, temperature_2m } = hourly as {
      time: string[]
      temperature_2m: string[]
    }
    return time.map((d, i) => ({ date: d, Tokyo: temperature_2m[i] }))
  })

  return (
    <Container m="auto">
      <Heading>This is a Temperature chart.</Heading>
      <LineChart
        data={value ? value : []}
        series={[{ dataKey: "Tokyo", color: "red" }]}
        dataKey="date"
        withDots={false}
        withActiveDots={false}
        unit="°C"
      />
    </Container>
  )
}

export default TemperatureChart
