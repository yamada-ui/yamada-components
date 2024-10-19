import type { Dict } from "@yamada-ui/react"

type FetchedData = {
  hourly: {
    temperature_2m: number[]
    time: string[]
  }
  latitude: number
  longitude: number
}[]

export const locationKeys = ["Tokyo", "Osaka", "Hokkaido", "Okinawa"]

const dataFormatter = (data: FetchedData): Dict<number | string>[] => {
  const result: Dict<number | string>[] =
    data[0]?.hourly.time.map((date) => ({
      date,
      formattedDate: new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        hour: "2-digit",
        hour12: false,
        minute: "2-digit",
        month: "short",
      }),
    })) || []

  data.forEach(({ hourly: { temperature_2m } }, index) => {
    const locationKey = locationKeys[index]

    temperature_2m.forEach((temp, index) => {
      if (result[index]) result[index][locationKey || ""] = temp
    })
  })

  return result
}

export const getTemperatureData = async (): Promise<
  Dict<number | string>[]
> => {
  const params = new URLSearchParams({
    forecast_days: "14",
    hourly: "temperature_2m",
    latitude: "35.6785,34.6937,43.0642,26.2124",
    longitude: "139.6823,135.5023,141.3468,127.6792",
    timezone: "Asia/Tokyo",
  })
  const url = new URL(`https://api.open-meteo.com/v1/forecast?${params}`)

  const response = await fetch(url, { cache: "force-cache" })
  const data: FetchedData = await response.json()

  return dataFormatter(data)
}
