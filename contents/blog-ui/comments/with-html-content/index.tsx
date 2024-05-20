import { Avatar, Box, Card, CardBody, Text, VStack } from "@yamada-ui/react"
import type { FC } from "react"

export const CommentWithHTMLContent: FC = () => {
  return (
    <Card variant="outline" maxW="md" m="md" mx="auto">
      <CardBody flexDir="row" placeItems="start">
        <Avatar src="https://avatars.githubusercontent.com/u/61367823?v=4" />
        <VStack gap="sm">
          <Box>
            <Text fontSize="sm">taroj1205</Text>
            <Text color="gray" fontSize="xs">
              10 minutes ago
            </Text>
          </Box>
          <Box
            dangerouslySetInnerHTML={{
              __html: `<p>I use <a href="https://heroku.com/" rel="noopener noreferrer" target="_blank">Heroku</a> to host my Node.js application, but MongoDB add-on appears to be too <strong>expensive</strong>. I consider switching to <a href="https://www.digitalocean.com/" rel="noopener noreferrer" target="_blank">Digital Ocean</a> VPS to save some cash.</p>`,
            }}
            fontSize="sm"
            css={{
              "& a": {
                color: "var(--ui-colors-link)",
                textDecoration: "underline",
              },
            }}
          />
        </VStack>
      </CardBody>
    </Card>
  )
}

export default CommentWithHTMLContent
