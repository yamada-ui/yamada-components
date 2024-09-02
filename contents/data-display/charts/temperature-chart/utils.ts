import type { Dict } from "@yamada-ui/react"

type FetchedData = {
  latitude: number
  longitude: number
  hourly: {
    time: string[]
    temperature_2m: number[]
  }
}[]

export const locationKeys = ["Tokyo", "Osaka", "Hokkaido", "Okinawa"]

const dataFormatter = (data: FetchedData): Dict<string | number>[] => {
  const result: Dict<string | number>[] = data[0].hourly.time.map((date) => ({
    date,
    formattedDate: new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
  }))

  data.forEach(({ hourly: { temperature_2m } }, index) => {
    const locationKey = locationKeys[index]

    temperature_2m.forEach((temp, index) => {
      result[index][locationKey] = temp
    })
  })

  return result
}

export const getTemperatureData = async (): Promise<
  Dict<string | number>[]
> => {
  const params = new URLSearchParams({
    latitude: "35.6785,34.6937,43.0642,26.2124",
    longitude: "139.6823,135.5023,141.3468,127.6792",
    hourly: "temperature_2m",
    timezone: "Asia/Tokyo",
    forecast_days: "14",
  })
  const url = new URL(`https://api.open-meteo.com/v1/forecast?${params}`)

  const response = await fetch(url, { cache: "force-cache" })
  const data: FetchedData = await response.json()

  return dataFormatter(data)
}
