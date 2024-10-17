import type { FC } from "react"
import { Table } from "@yamada-ui/table"
import { useMemo } from "react"

const columns = [
  {
    accessorKey: "provider",
    header: "Provider",
  },
  {
    accessorKey: "domain",
    header: "Domain",
  },
  {
    accessorKey: "cookie",
    header: "Name",
  },
  {
    accessorKey: "expiration",
    header: "Expiration",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
]

export const CookieTable: FC<{
  tableData: {
    cookie: string
    description: string
    domain: string
    expiration: string
    provider: string
  }[]
}> = ({ tableData }) => {
  const data = useMemo(
    () =>
      tableData.map((item) => ({
        cookie: item.cookie,
        description: item.description,
        domain: item.domain,
        expiration: item.expiration,
        provider: item.provider,
      })),
    [tableData],
  )
  return (
    <Table
      size="sm"
      columns={columns}
      data={data}
      enableRowSelection={false}
      withBorder
    />
  )
}
