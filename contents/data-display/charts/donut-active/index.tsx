import type { CellProps, ChartLabel } from "@yamada-ui/charts"
import type { SelectItem } from "@yamada-ui/react"
import type { FC } from "react"
import { DonutChart } from "@yamada-ui/charts"
import { Box, Select, Text, VStack } from "@yamada-ui/react"
import { useMemo, useState } from "react"

const DonutActive: FC = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const data: CellProps[] = useMemo(
    () => [
      {
        name: "USA",
        color: "primary.200",
        value: 400,
      },
      {
        name: "India",
        color: "primary.300",
        value: 300,
      },
      {
        name: "Japan",
        color: "primary.400",
        value: 100,
      },
      {
        name: "Other",
        color: "primary.500",
        value: 200,
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
          dominantBaseline="middle"
          textAnchor="middle"
          x={viewBox.cx}
          y={viewBox.cy}
        >
          <Text
            as="tspan"
            fill={["black", "white"]}
            fontSize="5xl"
            fontWeight="bold"
          >
            {data[activeIndex]?.value}
          </Text>
          <Text
            as="tspan"
            dy={24}
            fill={["blackAlpha.700", "whiteAlpha.600"]}
            fontSize="sm"
            x={viewBox.cx}
            y={viewBox.cy}
          >
            Visitors
          </Text>
        </Box>
      )
    }
  }

  return (
    <VStack alignItems="center" gap="md" my="md">
      <Select
        defaultValue="USA"
        items={items}
        maxW="xs"
        placement="right-start"
        onChange={(value) => {
          const index = data.findIndex(({ name }) => name === value)
          setActiveIndex(index)
        }}
      />

      <DonutChart
        data={data}
        h="sm"
        innerRadius={60}
        outerRadius={100}
        tooltipAnimationDuration={500}
        tooltipDataSource="segment"
        w="sm"
        labelProps={{
          content: label,
        }}
        pieProps={{
          activeIndex,
          activeShape: {
            outerRadius: 125,
          },
          isAnimationActive: true,
        }}
      />
    </VStack>
  )
}

export default DonutActive
