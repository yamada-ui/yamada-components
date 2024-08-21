import { AreaChart } from "@yamada-ui/charts"
import {
  Center,
  Heading,
  HStack,
  Loading,
  Select,
  Text,
  useAsync,
  VStack,
  Option,
} from "@yamada-ui/react"
import { useMemo, useState, type FC } from "react"
import CustomRadioGroup from "./custom-radio"
import { formatDate, getTemperatureData, locationKeys } from "./utils"

type RangeType = "2w" | "1w" | "1d"

const TemperatureChart: FC = () => {
  const today = useMemo(() => new Date(), [])
  const [dateRange, setDateRange] = useState<RangeType>("2w")
  const [location, setLocation] = useState("Tokyo")

  const { value, loading } = useAsync(async () => {
    try {
      const twoWeek = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000)

      const startDateString = formatDate(today)
      const endDateString = formatDate(twoWeek)

      return await getTemperatureData(startDateString, endDateString)
    } catch {
      return []
    }
  }, [])

  const filteredData = useMemo(() => {
    switch (dateRange) {
      case "2w":
        return value
      case "1w":
        return value?.filter(
          ({ date }) =>
            new Date(date) <=
            new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000),
        )
      case "1d":
        return value?.filter(
          ({ date }) =>
            new Date(date) <=
            new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000),
        )

      default:
        break
    }
  }, [dateRange, today, value])

  const domain = useMemo(() => {
    const domainMargin = 3

    let minTemperature = Number.MAX_VALUE
    let maxTemperature = Number.MIN_VALUE

    filteredData?.forEach((data) => {
      locationKeys.forEach((key) => {
        if (typeof data[key] === "number") {
          minTemperature = Math.min(minTemperature, data[key])
          maxTemperature = Math.max(maxTemperature, data[key])
        }
      })
    })
    minTemperature = Math.floor(minTemperature)
    maxTemperature = Math.ceil(maxTemperature)

    return [minTemperature - domainMargin, maxTemperature + domainMargin]
  }, [filteredData])

  const options = useMemo(
    () =>
      locationKeys.map((location) => ({
        value: location,
        currentTemperature: (value?.[0][location] as number) ?? 0,
      })),
    [value],
  )

  return (
    <VStack as="article">
      <HStack
        as="header"
        borderBottomWidth="1px"
        justifyContent="space-between"
      >
        <Heading px="md" py="sm">
          Temperature in Japan
        </Heading>

        <CustomRadioGroup
          options={options}
          onChange={setLocation}
          value={location}
        />
      </HStack>

      <VStack px="md" py="sm" gap="md" alignItems="flex-end">
        <Select
          maxW="xs"
          defaultValue="2w"
          onChange={(value) => setDateRange(value as RangeType)}
        >
          <Option value="2w">2 weeks later</Option>
          <Option value="1w">1 week later</Option>
          <Option value="1d">tomorrow</Option>
        </Select>

        {loading ? (
          <Center h="md" w="full">
            <Loading boxSize="5xs" />
          </Center>
        ) : value?.length === 0 ? (
          <Center h="md" w="full">
            <Text>No data found for the selected date range.</Text>
          </Center>
        ) : (
          <AreaChart
            data={filteredData ?? []}
            series={[
              {
                dataKey: location,
                color: "primary.500",
              },
            ]}
            dataKey="formattedDate"
            withDots={false}
            unit="°C"
            tooltipAnimationDuration={500}
            chartProps={{
              margin: { left: 12, right: 12 },
            }}
            areaProps={{ isAnimationActive: true }}
            xAxisProps={{
              minTickGap: 60,
              interval: "preserveEnd",
            }}
            yAxisProps={{ domain }}
          />
        )}
      </VStack>
    </VStack>
  )
}

export default TemperatureChart
