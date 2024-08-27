import type { CellProps, ChartLabel } from "@yamada-ui/charts"
import { DonutChart } from "@yamada-ui/charts"
import type { SelectItem } from "@yamada-ui/react"
import { Box, Select, VStack, Text } from "@yamada-ui/react"
import { useMemo, useState, type FC } from "react"

const DonutActive: FC = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const data: CellProps[] = useMemo(
    () => [
      {
        name: "USA",
        value: 400,
        color: "primary.200",
      },
      {
        name: "India",
        value: 300,
        color: "primary.300",
      },
      {
        name: "Japan",
        value: 100,
        color: "primary.400",
      },
      {
        name: "Other",
        value: 200,
        color: "primary.500",
      },
    ],
    [],
  )

  const items: SelectItem[] = useMemo(
    () => data.map(({ name }) => ({ label: name, value: name })),
    [data],
  )

  const label: ChartLabel = ({ viewBox }) => {
    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
      return (
        <Box
          as="text"
          x={viewBox.cx}
          y={viewBox.cy}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          <Text
            as="tspan"
            fill={["black", "white"]}
            fontWeight="bold"
            fontSize="5xl"
          >
            {data[activeIndex].value}
          </Text>
          <Text
            as="tspan"
            fill={["blackAlpha.700", "whiteAlpha.600"]}
            fontSize="sm"
            x={viewBox.cx}
            y={viewBox.cy}
            dy={24}
          >
            Visitors
          </Text>
        </Box>
      )
    }
  }

  return (
    <VStack my="md" gap="md" alignItems="center">
      <Select
        maxW="xs"
        placement="right-start"
        defaultValue="USA"
        items={items}
        onChange={(value) => {
          const index = data.findIndex(({ name }) => name === value)
          setActiveIndex(index)
        }}
      />

      <DonutChart
        data={data}
        h="sm"
        w="sm"
        tooltipDataSource="segment"
        tooltipAnimationDuration={500}
        innerRadius={60}
        outerRadius={100}
        pieProps={{
          isAnimationActive: true,
          activeIndex,
          activeShape: {
            outerRadius: 125,
          },
        }}
        labelProps={{
          content: label,
        }}
      />
    </VStack>
  )
}

export default DonutActive
