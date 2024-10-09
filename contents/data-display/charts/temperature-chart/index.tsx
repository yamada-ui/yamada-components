import type { FC } from "react"
import { AreaChart } from "@yamada-ui/charts"
import {
  Center,
  Heading,
  Loading,
  Option,
  Select,
  Stack,
  Text,
  useAsync,
  VStack,
} from "@yamada-ui/react"
import { useMemo, useState } from "react"
import CustomRadioGroup from "./custom-radio"
import { getTemperatureData, locationKeys } from "./utils"

type RangeType = "1d" | "1w" | "2w"

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

  const { loading, value } = useAsync(async () => {
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
        currentTemperature: (value?.[0][location] as number) ?? 0,
        value: location,
      })),
    [value],
  )

  return (
    <VStack as="article">
      <Stack
        as="header"
        alignItems={{ base: "center", lg: "flex-start" }}
        borderBottomWidth="1px"
        direction={{ base: "row", lg: "column" }}
        gap={0}
        justifyContent="space-between"
      >
        <VStack gap={0} px="md" py="sm">
          <Heading isTruncated>Temperature forecast in Japan</Heading>
          <Text color={["blackAlpha.700", "whiteAlpha.600"]} isTruncated>
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
          value={location}
          onChange={setLocation}
        />
      </Stack>

      <VStack alignItems="flex-end" gap="md" px="md" py="sm">
        <Select
          defaultValue="2w"
          maxW="xs"
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
            dataKey="formattedDate"
            series={[
              {
                color: "primary.500",
                dataKey: location,
              },
            ]}
            tooltipAnimationDuration={500}
            unit="°C"
            withDots={false}
            areaProps={{ isAnimationActive: true }}
            chartProps={{
              margin: { left: 12, right: 12 },
            }}
            xAxisProps={{
              interval: "preserveEnd",
              minTickGap: 60,
            }}
            yAxisProps={{ domain }}
          />
        )}
      </VStack>
    </VStack>
  )
}

export default TemperatureChart
