import type { CellProps, ChartLabel } from "@yamada-ui/charts"
import { DonutChart, RadialChart } from "@yamada-ui/charts"
import { Box, VStack, Text, SimpleGrid, GridItem } from "@yamada-ui/react"
import { useMemo, type FC } from "react"

const ChartWithText: FC = () => {
  const data: CellProps[] = useMemo(
    () => [
      { name: "USA", value: 440, color: "primary.200" },
      { name: "India", value: 310, color: "primary.300" },
      { name: "Japan", value: 150, color: "primary.400" },
      { name: "Other", value: 230, color: "primary.500" },
    ],
    [],
  )

  const totalValue = useMemo(
    () => data.reduce((total, cell) => total + cell.value, 0).toLocaleString(),
    [data],
  )

  const label: ChartLabel = ({ viewBox }) => {
    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
      return (
        <Box as="text" x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
          <Text as="tspan" dy={-15} fill="gray.300">
            Total
          </Text>
          <Text
            as="tspan"
            x={viewBox.cx}
            y={viewBox.cy}
            dy={20}
            fill={["black", "white"]}
            fontWeight="bold"
            fontSize="3xl"
          >
            {totalValue}
          </Text>
        </Box>
      )
    }
  }

  return (
    <SimpleGrid columns={{ base: 3, md: 1 }} gap="md" alignItems="center">
      <GridItem position="relative">
        <RadialChart
          h="xs"
          w="xs"
          data={[{ value: 100, color: "primary.500" }]}
          dataKey="value"
          innerRadius={80}
          outerRadius={110}
          startAngle={0}
          endAngle={100}
          radialBarProps={{
            isAnimationActive: true,
            background: { fill: ["neutral.50", "neutral.800"] },
          }}
          withPolarGrid
          polarGridProps={{
            gridType: "circle",
            radialLines: false,
            strokeWidth: 0,
            polarRadius: [86, 74],
            _first: {
              fill: ["neutral.50", "neutral.800"],
            },
            _last: {
              fill: "background",
            },
          }}
        />

        <VStack
          position="absolute"
          top={0}
          gap={0}
          w="full"
          h="xs"
          textAlign="center"
          justifyContent="center"
        >
          <Text fontSize="5xl" fontWeight="bold">
            732
          </Text>
          <Text color="gray.300">starred</Text>
        </VStack>
      </GridItem>

      <GridItem position="relative">
        <RadialChart
          h="xs"
          w="xs"
          data={[{ value: 100, color: "primary.500" }]}
          dataKey="value"
          innerRadius={80}
          outerRadius={95}
          startAngle={0}
          endAngle={250}
          radialBarProps={{
            isAnimationActive: true,
            cornerRadius: 10,
            background: { fill: ["neutral.50", "neutral.800"] },
          }}
          withPolarGrid
          polarGridProps={{
            gridType: "circle",
            radialLines: false,
            strokeWidth: 0,
            polarRadius: [86, 74],
            _first: {
              fill: ["neutral.50", "neutral.800"],
            },
            _last: {
              fill: "background",
            },
          }}
        />

        <VStack
          position="absolute"
          top={0}
          gap={0}
          w="full"
          h="xs"
          textAlign="center"
          justifyContent="center"
        >
          <Text fontSize="5xl" fontWeight="bold">
            1,994
          </Text>
          <Text color="gray.300">DL/month</Text>
        </VStack>
      </GridItem>

      <GridItem justifyContent="center">
        <DonutChart
          w="full"
          data={data}
          outerRadius="100%"
          innerRadius="80%"
          paddingAngle={3}
          withTooltip={false}
          pieProps={{ isAnimationActive: true }}
          labelProps={{
            content: label,
          }}
        />
      </GridItem>
    </SimpleGrid>
  )
}

export default ChartWithText
