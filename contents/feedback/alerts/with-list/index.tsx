import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  DiscList,
  ListItem,
} from "@yamada-ui/react"
import type { FC } from "react"

const WithList: FC = () => {
  return (
    <Alert status="error" variant="subtle" alignItems="flex-start" maxW="5xl">
      <AlertIcon />
      <Box>
        <AlertTitle mb={3}>
          There were 2 errors with your submission.
        </AlertTitle>
        <AlertDescription>
          <DiscList>
            <ListItem>Your password must be at least 8 characters</ListItem>
            <ListItem>
              Your password must include at least one pro wrestling finishing
              move
            </ListItem>
          </DiscList>
        </AlertDescription>
      </Box>
    </Alert>
  )
}

export default WithList
