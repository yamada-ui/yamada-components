import {
  AreaChart,
  BarChart,
  DonutChart,
  LineChart,
  PieChart,
  RadarChart,
} from "@yamada-ui/charts"
import { GridItem, SimpleGrid } from "@yamada-ui/react"
import { useMemo, type FC } from "react"

const SimpleCharts: FC = () => {
  const mappedData = useMemo(
    () => [10, 20, 40, 20, 60].map((value, index) => ({ value, index })),
    [],
  )

  const pieChartData = useMemo(
    () =>
      [10, 20, 40, 20, 60].map((value, index) => ({
        name: `${index}`,
        value,
        color: `primary.${(index + 1) * 100}`,
      })),
    [],
  )

  return (
    <SimpleGrid columns={{ base: 6, lg: 3, md: 2, sm: 1 }} gap="md">
      <GridItem>
        <AreaChart
          boxSize="2xs"
          data={mappedData}
          series={[{ dataKey: "value", color: "primary.500" }]}
          dataKey="index"
          curveType="linear"
          areaProps={{ isAnimationActive: true }}
          withXAxis={false}
          withYAxis={false}
          gridAxis="none"
          withTooltip={false}
          withDots={false}
        />
      </GridItem>

      <GridItem>
        <LineChart
          boxSize="2xs"
          data={mappedData}
          series={[{ dataKey: "value", color: "primary.500" }]}
          dataKey="index"
          curveType="linear"
          lineProps={{ isAnimationActive: true }}
          withXAxis={false}
          withYAxis={false}
          gridAxis="none"
          withTooltip={false}
          withDots={false}
        />
      </GridItem>

      <GridItem>
        <BarChart
          boxSize="2xs"
          data={mappedData}
          series={[{ dataKey: "value", color: "primary.500" }]}
          dataKey="index"
          barProps={{ isAnimationActive: true }}
          withXAxis={false}
          withYAxis={false}
          gridAxis="none"
          withTooltip={false}
        />
      </GridItem>

      <GridItem>
        <PieChart
          boxSize="2xs"
          data={pieChartData}
          pieProps={{ isAnimationActive: true }}
          withTooltip={false}
        />
      </GridItem>

      <GridItem>
        <DonutChart
          boxSize="2xs"
          data={pieChartData}
          pieProps={{ isAnimationActive: true }}
          withTooltip={false}
        />
      </GridItem>

      <GridItem>
        <RadarChart
          boxSize="2xs"
          data={mappedData}
          series={[{ dataKey: "value", color: "primary.500" }]}
          dataKey="index"
          radarProps={{ isAnimationActive: true }}
          withPolarAngleAxis={false}
          withTooltip={false}
        />
      </GridItem>
    </SimpleGrid>
  )
}

export default SimpleCharts
