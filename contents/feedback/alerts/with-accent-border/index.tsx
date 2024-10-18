import type { FC } from "react"
import { Alert, AlertDescription, AlertIcon, Link } from "@yamada-ui/react"

const WithAccentBorder: FC = () => {
  return (
    <Alert variant="left-accent" maxW="5xl" status="warning">
      <AlertIcon />
      <AlertDescription>
        You have no credits left.
        <Link
          href="#"
          color="warning"
          fontWeight="semibold"
          ms={1}
          textDecoration="underline"
          onClick={(e) => e.preventDefault()}
        >
          Upgrade your account to add more credits.
        </Link>
      </AlertDescription>
    </Alert>
  )
}

export default WithAccentBorder
