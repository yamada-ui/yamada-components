import { Alert, AlertIcon, AlertTitle, Link, Spacer } from "@yamada-ui/react"
import type { FC } from "react"

const WithLinkOnRight: FC = () => {
  return (
    <Alert status="info" variant="subtle" maxW="5xl">
      <AlertIcon />
      <AlertTitle>
        A new software update is available. See what’s new in version 2.0.4.
      </AlertTitle>
      <Spacer />
      <Link href="#" onClick={(e) => e.preventDefault()} textWrap="nowrap">
        Details →
      </Link>
    </Alert>
  )
}

export default WithLinkOnRight
