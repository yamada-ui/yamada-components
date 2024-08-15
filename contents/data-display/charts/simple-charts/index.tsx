import {
  AreaChart,
  BarChart,
  DonutChart,
  LineChart,
  PieChart,
  RadarChart,
} from "@yamada-ui/charts"
import { Grid, GridItem } from "@yamada-ui/react"
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
    <Grid
      templateAreas={`
        "areaChart lineChart barChart pieChart donutChart radarChart"
      `}
      gap="sm"
    >
      <GridItem area="areaChart" boxSize="sm">
        <AreaChart
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

      <GridItem area="lineChart" boxSize="sm">
        <LineChart
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

      <GridItem area="barChart" boxSize="sm">
        <BarChart
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

      <GridItem area="pieChart" boxSize="sm">
        <PieChart
          data={pieChartData}
          pieProps={{ isAnimationActive: true }}
          withTooltip={false}
        />
      </GridItem>

      <GridItem area="donutChart" boxSize="sm">
        <DonutChart
          data={pieChartData}
          pieProps={{ isAnimationActive: true }}
          withTooltip={false}
        />
      </GridItem>

      <GridItem area="radarChart" boxSize="sm">
        <RadarChart
          data={mappedData}
          series={[{ dataKey: "value", color: "primary.500" }]}
          dataKey="index"
          radarProps={{ isAnimationActive: true }}
          withPolarAngleAxis={false}
          withTooltip={false}
        />
      </GridItem>
    </Grid>
  )
}

export default SimpleCharts
