import { AreaChart } from "@yamada-ui/charts"
import { useMemo, type FC } from "react"

const SimpleCharts: FC = () => {
  const data = useMemo(
    () =>
      [10, 20, 40, 20, 40, 10, 50].map((value, index) => ({ value, index })),
    [],
  )

  return (
    <>
      <AreaChart
        data={data}
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
    </>
  )
}

export default SimpleCharts
