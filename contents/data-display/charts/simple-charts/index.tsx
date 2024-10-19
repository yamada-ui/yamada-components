import type { FC } from "react"
import {
  AreaChart,
  BarChart,
  DonutChart,
  LineChart,
  PieChart,
  RadarChart,
} from "@yamada-ui/charts"
import { GridItem, SimpleGrid } from "@yamada-ui/react"
import { useMemo } from "react"

const SimpleCharts: FC = () => {
  const data = useMemo(() => [10, 20, 40, 20, 60], [])

  const mappedData = useMemo(
    () => data.map((value, index) => ({ index, value })),
    [data],
  )

  const pieChartData = useMemo(
    () =>
      data.map((value, index) => ({
        name: `${index}`,
        color: `primary.${(index + 1) * 100}`,
        value,
      })),
    [data],
  )

  return (
    <SimpleGrid columns={{ base: 6, sm: 1, md: 2, lg: 3 }} gap="md">
      <GridItem>
        <AreaChart
          boxSize="2xs"
          curveType="linear"
          data={mappedData}
          dataKey="index"
          gridAxis="none"
          series={[{ color: "primary.500", dataKey: "value" }]}
          withDots={false}
          withTooltip={false}
          withXAxis={false}
          withYAxis={false}
          areaProps={{ isAnimationActive: true }}
        />
      </GridItem>

      <GridItem>
        <LineChart
          boxSize="2xs"
          curveType="linear"
          data={mappedData}
          dataKey="index"
          gridAxis="none"
          series={[{ color: "primary.500", dataKey: "value" }]}
          withDots={false}
          withTooltip={false}
          withXAxis={false}
          withYAxis={false}
          lineProps={{ isAnimationActive: true }}
        />
      </GridItem>

      <GridItem>
        <BarChart
          boxSize="2xs"
          data={mappedData}
          dataKey="index"
          gridAxis="none"
          series={[{ color: "primary.500", dataKey: "value" }]}
          withTooltip={false}
          withXAxis={false}
          withYAxis={false}
          barProps={{ isAnimationActive: true }}
        />
      </GridItem>

      <GridItem>
        <PieChart
          boxSize="2xs"
          data={pieChartData}
          withTooltip={false}
          pieProps={{ isAnimationActive: true }}
        />
      </GridItem>

      <GridItem>
        <DonutChart
          boxSize="2xs"
          data={pieChartData}
          withTooltip={false}
          pieProps={{ isAnimationActive: true }}
        />
      </GridItem>

      <GridItem>
        <RadarChart
          boxSize="2xs"
          data={mappedData}
          dataKey="index"
          series={[{ color: "primary.500", dataKey: "value" }]}
          withPolarAngleAxis={false}
          withTooltip={false}
          radarProps={{ isAnimationActive: true }}
        />
      </GridItem>
    </SimpleGrid>
  )
}

export default SimpleCharts
