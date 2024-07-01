import { Alert, AlertDescription, AlertIcon, Link } from "@yamada-ui/react"
import type { FC } from "react"

const WithAccentBorder: FC = () => {
  return (
    <Alert variant="left-accent" status="warning" maxW="5xl">
      <AlertIcon />
      <AlertDescription>
        You have no credits left.
        <Link
          href="#"
          ms={1}
          textDecoration="underline"
          onClick={(e) => e.preventDefault()}
          color="warning"
          fontWeight="semibold"
        >
          Upgrade your account to add more credits.
        </Link>
      </AlertDescription>
    </Alert>
  )
}

export default WithAccentBorder
