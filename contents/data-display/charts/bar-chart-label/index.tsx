import type { BarProps } from "@yamada-ui/charts"
import type { FC } from "react"
import { BarChart } from "@yamada-ui/charts"
import { useMemo } from "react"

const BarChartLabel: FC = () => {
  const data = useMemo(
    () => [
      { desktop: 186, month: "January" },
      { desktop: 305, month: "February" },
      { desktop: 237, month: "March" },
      { desktop: 73, month: "April" },
      { desktop: 209, month: "May" },
      { desktop: 214, month: "June" },
    ],
    [],
  )

  const series: BarProps[] = useMemo(
    () => [{ color: "primary.500", dataKey: "desktop" }],
    [],
  )

  return (
    <BarChart
      data={data}
      dataKey="month"
      gridAxis="none"
      maxW="xl"
      mx="auto"
      series={series}
      tooltipAnimationDuration={300}
      withYAxis={false}
      barProps={{
        isAnimationActive: true,
        label: { fontSize: 14, offset: 12, position: "top" },
        radius: 8,
      }}
      chartProps={{
        margin: { top: 20 },
      }}
    />
  )
}

export default BarChartLabel
