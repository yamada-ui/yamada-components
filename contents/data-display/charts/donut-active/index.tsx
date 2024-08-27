import type { CellProps } from "@yamada-ui/charts"
import { DonutChart } from "@yamada-ui/charts"
import { useMemo, type FC } from "react"

const DonutActive: FC = () => {
  const data: CellProps[] = useMemo(
    () => [
      {
        name: "USA",
        value: 400,
        color: "red.500",
      },
      {
        name: "India",
        value: 300,
        color: "orange.500",
      },
      {
        name: "Japan",
        value: 100,
        color: "blue.500",
      },
      {
        name: "Other",
        value: 200,
        color: "gray.500",
      },
    ],
    [],
  )
  return (
    <DonutChart
      data={data}
      tooltipDataSource="segment"
      tooltipAnimationDuration={500}
      pieProps={{
        isAnimationActive: true,
        activeIndex: 1,
        activeShape: {
          outerRadius: 85,
        },
      }}
    />
  )
}

export default DonutActive
