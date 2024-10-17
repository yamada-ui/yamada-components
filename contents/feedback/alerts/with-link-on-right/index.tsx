import type { FC } from "react"
import { Alert, AlertIcon, AlertTitle, Link, Spacer } from "@yamada-ui/react"

const WithLinkOnRight: FC = () => {
  return (
    <Alert variant="subtle" maxW="5xl" status="info">
      <AlertIcon />
      <AlertTitle>
        A new software update is available. See what’s new in version 2.0.4.
      </AlertTitle>
      <Spacer />
      <Link href="#" textWrap="nowrap" onClick={(e) => e.preventDefault()}>
        Details →
      </Link>
    </Alert>
  )
}

export default WithLinkOnRight
