import { Link } from "@yamada-ui/react"
import type { FC } from "react"

/**
 * Link Item
 *
 * linkをラップする
 *
 * @param param0
 * @returns
 */
export const LinkItem: FC<{ item: { link: string; label: string } }> = ({
  item,
}) => {
  return <Link href={item.link}>{item.label}</Link>
}
