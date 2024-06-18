import {
  Avatar,
  Box,
  Card,
  CardBody,
  Grid,
  GridItem,
  Text,
} from "@yamada-ui/react"
import type { FC } from "react"

export const CommentWithHTMLContent: FC = () => {
  return (
    <Card variant="outline" maxW="md">
      <CardBody>
        <Grid
          templateAreas={`
            "avatar user empty"
            "avatar content content"
          `}
          gap="sm"
          _container={[
            {
              maxW: "300px",
              css: {
                gridTemplateAreas: `
                  "avatar user empty"
                  "content content content"
                `,
                placeItems: "center",
              },
            },
          ]}
        >
          <GridItem
            area="avatar"
            pr="sm"
            _container={[{ maxW: "300px", css: { pr: "xs" } }]}
          >
            <Avatar src="https://avatars.githubusercontent.com/u/61367823?v=4" />
          </GridItem>
          <GridItem area="user" placeItems="center">
            <Text fontSize="sm">taroj1205</Text>
            <Text color="gray" fontSize="xs">
              10 minutes ago
            </Text>
          </GridItem>
          <GridItem area="content">
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
              onClick={(e) => e.preventDefault()}
            />
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  )
}

export default CommentWithHTMLContent
