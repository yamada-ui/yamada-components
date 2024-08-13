export const locationKeys = ["Tokyo", "Osaka", "Hokkaido", "Okinawa"]

const colors = ["red", "green", "blue", "purple"]

export const locationColors = Object.fromEntries(
  locationKeys.map((locationKey, index) => [
    locationKey,
    colors[index % colors.length],
  ]),
)
