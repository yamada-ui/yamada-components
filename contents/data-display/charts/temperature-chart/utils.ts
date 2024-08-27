export const locationKeys = ["Tokyo", "Osaka", "Hokkaido", "Okinawa"]

export const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const day = date.getDate().toString().padStart(2, "0")
  return `${year}-${month}-${day}`
}

export const getTemperatureData = async (
  startDateString: string,
  endDateString: string,
) => {
  const url = new URL("https://api.open-meteo.com/v1/forecast")
  url.searchParams.set("latitude", "35.6785,34.6937,43.0642,26.2124")
  url.searchParams.set("longitude", "139.6823,135.5023,141.3468,127.6792")
  url.searchParams.set("hourly", "temperature_2m")
  url.searchParams.set("timezone", "Asia/Tokyo")
  url.searchParams.set("start_date", startDateString)
  url.searchParams.set("end_date", endDateString)

  const response = await fetch(url, { cache: "force-cache" })

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
      const locationKey = locationKeys[index]

      if (!locationKey) {
        throw new Error("Unexpected location index")
      }

      region.hourly.time.forEach((time, i) => {
        const formattedTime = new Date(time).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })

        if (!acc[i])
          acc[i] = { formattedDate: formattedTime, date: time } as Record<
            string,
            number | string
          >
        acc[i][locationKey] = region.hourly.temperature_2m[i]
      })
      return acc
    },
    [] as Array<Record<string, number | string>>,
  )

  return formattedData
}
