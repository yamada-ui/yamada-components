import { Table } from "@yamada-ui/table"
import { type FC, useMemo } from "react"

export const CookieTable: FC<{
  tableData: {
    provider: string
    domain: string
    cookie: string
    expiration: string
    description: string
  }[]
}> = ({ tableData }) => {
  const columns = useMemo(
    () => [
      {
        header: "Provider",
        accessorKey: "provider",
      },
      {
        header: "Domain",
        accessorKey: "domain",
      },
      {
        header: "Name",
        accessorKey: "cookie",
      },
      {
        header: "Expiration",
        accessorKey: "expiration",
      },
      {
        header: "Description",
        accessorKey: "description",
      },
    ],
    [],
  )
  const data = useMemo(
    () =>
      tableData.map((item) => ({
        provider: item.provider,
        domain: item.domain,
        cookie: item.cookie,
        expiration: item.expiration,
        description: item.description,
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
