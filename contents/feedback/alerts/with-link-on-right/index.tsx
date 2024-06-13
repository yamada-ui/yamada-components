import { Alert, AlertIcon, AlertTitle, Link, Spacer } from "@yamada-ui/react"
import type { FC } from "react"

const WithLinkOnRight: FC = () => {
  return (
    <Alert status="info" variant="subtle">
      {/* FIXME: Iconをwarningに設定 */}
      <AlertIcon />
      <AlertTitle>
        A new software update is available. See what’s new in version 2.0.4.
      </AlertTitle>
      <Spacer />
      <Link href="#" ms={1}>
        Details →
      </Link>
    </Alert>
  )
}

export default WithLinkOnRight
