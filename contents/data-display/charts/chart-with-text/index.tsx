import type { CellProps, ChartLabel } from "@yamada-ui/charts"
import type { FC } from "react"
import { DonutChart, RadialChart } from "@yamada-ui/charts"
import { Box, GridItem, SimpleGrid, Text, VStack } from "@yamada-ui/react"
import { useMemo } from "react"

const ChartWithText: FC = () => {
  const data: CellProps[] = useMemo(
    () => [
      { name: "USA", color: "primary.200", value: 440 },
      { name: "India", color: "primary.300", value: 310 },
      { name: "Japan", color: "primary.400", value: 150 },
      { name: "Other", color: "primary.500", value: 230 },
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
        <Box as="text" textAnchor="middle" x={viewBox.cx} y={viewBox.cy}>
          <Text as="tspan" dy={-15} fill="gray.300">
            Total
          </Text>
          <Text
            as="tspan"
            dy={20}
            fill={["black", "white"]}
            fontSize="3xl"
            fontWeight="bold"
            x={viewBox.cx}
            y={viewBox.cy}
          >
            {totalValue}
          </Text>
        </Box>
      )
    }
  }

  return (
    <SimpleGrid alignItems="center" columns={{ base: 3, md: 1 }} gap="md">
      <GridItem position="relative">
        <RadialChart
          data={[{ color: "primary.500", value: 100 }]}
          dataKey="value"
          endAngle={100}
          h="xs"
          innerRadius={80}
          outerRadius={110}
          startAngle={0}
          w="xs"
          withPolarGrid
          polarGridProps={{
            gridType: "circle",
            polarRadius: [86, 74],
            radialLines: false,
            strokeWidth: 0,
            _first: {
              fill: ["neutral.50", "neutral.800"],
            },
            _last: {
              fill: "background",
            },
          }}
          radialBarProps={{
            background: { fill: ["neutral.50", "neutral.800"] },
            isAnimationActive: true,
          }}
        />

        <VStack
          gap={0}
          h="xs"
          justifyContent="center"
          position="absolute"
          textAlign="center"
          top={0}
          w="full"
        >
          <Text fontSize="5xl" fontWeight="bold">
            732
          </Text>
          <Text color="gray.300">starred</Text>
        </VStack>
      </GridItem>

      <GridItem position="relative">
        <RadialChart
          data={[{ color: "primary.500", value: 100 }]}
          dataKey="value"
          endAngle={250}
          h="xs"
          innerRadius={80}
          outerRadius={95}
          startAngle={0}
          w="xs"
          withPolarGrid
          polarGridProps={{
            gridType: "circle",
            polarRadius: [86, 74],
            radialLines: false,
            strokeWidth: 0,
            _first: {
              fill: ["neutral.50", "neutral.800"],
            },
            _last: {
              fill: "background",
            },
          }}
          radialBarProps={{
            background: { fill: ["neutral.50", "neutral.800"] },
            cornerRadius: 10,
            isAnimationActive: true,
          }}
        />

        <VStack
          gap={0}
          h="xs"
          justifyContent="center"
          position="absolute"
          textAlign="center"
          top={0}
          w="full"
        >
          <Text fontSize="5xl" fontWeight="bold">
            1,994
          </Text>
          <Text color="gray.300">DL/month</Text>
        </VStack>
      </GridItem>

      <GridItem justifyContent="center">
        <DonutChart
          data={data}
          innerRadius="80%"
          outerRadius="100%"
          paddingAngle={3}
          w="full"
          withTooltip={false}
          labelProps={{
            content: label,
          }}
          pieProps={{ isAnimationActive: true }}
        />
      </GridItem>
    </SimpleGrid>
  )
}

export default ChartWithText
