import { RangeDatePicker } from "@yamada-ui/calendar"
import { LineChart } from "@yamada-ui/charts"
import {
  Center,
  Container,
  Heading,
  Loading,
  Text,
  useAsync,
  useDisclosure,
  VStack,
} from "@yamada-ui/react"
import { useState, type FC, useCallback, useRef, useMemo } from "react"
import { locationKeys, locationColors } from "./locations"
import { formatDate, getWeeklyTemperatureData, PERIOD_SUGGEST } from "./utils"

const DateRangeTemperatureChart: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const today = new Date()
  const nextWeek = new Date()
  nextWeek.setDate(today.getDate() + 6)

  const pastThreeMonths = useMemo(() => new Date(), [])
  pastThreeMonths.setMonth(today.getMonth() - 3)

  const futureTwoWeeks = new Date()
  futureTwoWeeks.setDate(today.getDate() + 13)

  const [dateRange, setDateRange] = useState<
    [(Date | undefined)?, (Date | undefined)?]
  >([today, nextWeek])

  const valueRef = useRef<[(Date | undefined)?, (Date | undefined)?]>([
    today,
    nextWeek,
  ])

  const { value, loading } = useAsync(async () => {
    try {
      if (!dateRange[0] || !dateRange[1]) return []

      const startDateString = formatDate(dateRange[0])
      const endDateString = formatDate(dateRange[1])

      return await getWeeklyTemperatureData(startDateString, endDateString)
    } catch {
      return []
    }
  }, [dateRange])

  const onSuggestChange = useCallback(
    (type: string) => {
      const [, _count, unit] = type.match(/^(\d+)([dMy])$/) ?? []
      const isDay = unit === "d"
      let count = parseInt(_count)

      if (isDay) count -= 1

      const endDate = new Date()
      const startDate = new Date()

      switch (unit) {
        case "d":
          startDate.setDate(endDate.getDate() - count)
          break
        case "M":
          startDate.setMonth(endDate.getMonth() - count)
          break
        case "y":
          startDate.setFullYear(endDate.getFullYear() - count)
          break
      }

      if (startDate < pastThreeMonths) {
        startDate.setTime(pastThreeMonths.getTime())
      }

      const value: [Date, Date] = [startDate, endDate]

      valueRef.current = value
      setDateRange(value)
      onClose()
    },
    [onClose, pastThreeMonths],
  )

  return (
    <Container>
      <Heading>Date Range Temperature Chart</Heading>
      <Center gap="md">
        <RangeDatePicker
          placeholder="YYYY/MM/DD"
          minDate={pastThreeMonths}
          maxDate={futureTwoWeeks}
          value={dateRange}
          onChange={setDateRange}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
        >
          <VStack mt="sm" gap="sm">
            {PERIOD_SUGGEST.map((value) => (
              <Center
                key={value}
                as="button"
                type="button"
                w="full"
                h="8"
                fontSize="sm"
                bg={["blackAlpha.100", "whiteAlpha.100"]}
                _hover={{
                  bg: ["blackAlpha.200", "whiteAlpha.200"],
                }}
                rounded="md"
                transitionProperty="background"
                transitionDuration="slower"
                onClick={() => onSuggestChange(value)}
              >
                {value}
              </Center>
            ))}
          </VStack>
        </RangeDatePicker>
      </Center>
      {loading ? (
        <Center h="md">
          <Loading boxSize="5xs" />
        </Center>
      ) : value?.length === 0 ? (
        <Center h="md">
          <Text>No data found for the selected date range.</Text>
        </Center>
      ) : (
        <LineChart
          data={value ? value : []}
          series={locationKeys.map((locationKey) => ({
            dataKey: locationKey,
            color: locationColors[locationKey],
          }))}
          dataKey="date"
          withDots={false}
          withActiveDots={false}
          unit="°C"
        />
      )}
    </Container>
  )
}

export default DateRangeTemperatureChart
