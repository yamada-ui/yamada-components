import type { BarProps } from "@yamada-ui/charts"
import { BarChart } from "@yamada-ui/charts"
import { useMemo, type FC } from "react"

const BarChartLabel: FC = () => {
  const data = useMemo(
    () => [
      { month: "January", desktop: 186 },
      { month: "February", desktop: 305 },
      { month: "March", desktop: 237 },
      { month: "April", desktop: 73 },
      { month: "May", desktop: 209 },
      { month: "June", desktop: 214 },
    ],
    [],
  )
  const series: BarProps[] = useMemo(
    () => [{ dataKey: "desktop", color: "primary.500" }],
    [],
  )

  return (
    <BarChart
      data={data}
      series={series}
      dataKey="month"
      chartProps={{
        margin: { top: 20 },
      }}
      barProps={{
        isAnimationActive: true,
        radius: 8,
        label: { position: "top", offset: 12, fontSize: 14 },
      }}
      withYAxis={false}
      gridAxis="none"
      tooltipAnimationDuration={300}
    />
  )
}

export default BarChartLabel
