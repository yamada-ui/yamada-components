import { AreaChart } from "@yamada-ui/charts"
import {
  Center,
  Heading,
  Loading,
  Select,
  Text,
  useAsync,
  VStack,
  Option,
  Stack,
} from "@yamada-ui/react"
import { useMemo, useState, type FC } from "react"
import CustomRadioGroup from "./custom-radio"
import { getTemperatureData, locationKeys } from "./utils"

type RangeType = "2w" | "1w" | "1d"

const TemperatureChart: FC = () => {
  const oneWeekLater = useMemo(() => {
    const date = new Date()
    date.setDate(date.getDate() + 7)

    return date
  }, [])
  const oneDayLater = useMemo(() => {
    const date = new Date()
    date.setDate(date.getDate() + 1)

    return date
  }, [])

  const [dateRange, setDateRange] = useState<RangeType>("2w")
  const [location, setLocation] = useState("Tokyo")

  const { value, loading } = useAsync(async () => {
    try {
      return await getTemperatureData()
    } catch {
      return []
    }
  }, [])

  const filteredData = useMemo(() => {
    switch (dateRange) {
      case "2w":
        return value
      case "1w":
        return value?.filter(({ date }) => new Date(date) <= oneWeekLater)
      case "1d":
        return value?.filter(({ date }) => new Date(date) <= oneDayLater)

      default:
        break
    }
  }, [dateRange, oneDayLater, value, oneWeekLater])

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
      <Stack
        as="header"
        gap={0}
        direction={{ base: "row", lg: "column" }}
        alignItems={{ base: "center", lg: "flex-start" }}
        justifyContent="space-between"
        borderBottomWidth="1px"
      >
        <VStack px="md" py="sm" gap={0}>
          <Heading isTruncated>Temperature forecast in Japan</Heading>
          <Text isTruncated color={["blackAlpha.700", "whiteAlpha.600"]}>
            {`Showing temperature in Japan for ${
              dateRange === "2w"
                ? "the next two weeks"
                : dateRange === "1w"
                  ? "the next week"
                  : "tomorrow"
            }.`}
          </Text>
        </VStack>

        <CustomRadioGroup
          options={options}
          onChange={setLocation}
          value={location}
        />
      </Stack>

      <VStack px="md" py="sm" gap="md" alignItems="flex-end">
        <Select
          maxW="xs"
          defaultValue="2w"
          onChange={(value) => setDateRange(value as RangeType)}
        >
          <Option value="2w">2 weeks later</Option>
          <Option value="1w">Next week</Option>
          <Option value="1d">Tomorrow</Option>
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
