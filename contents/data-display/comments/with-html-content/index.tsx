import type { FC } from "react"
import {
  Avatar,
  Box,
  Card,
  CardBody,
  Grid,
  GridItem,
  Text,
} from "@yamada-ui/react"

export const CommentWithHTMLContent: FC = () => {
  return (
    <Card variant="outline" maxW="md">
      <CardBody>
        <Grid
          gap="sm"
          placeItems={{ base: "start", sm: "center" }}
          templateAreas={{
            base: `"avatar user empty" "avatar content content"`,
            sm: `"avatar user empty" "content content content"`,
          }}
        >
          <GridItem area="avatar" pr={{ base: "sm", sm: "xs" }}>
            <Avatar src="https://avatars.githubusercontent.com/u/61367823?v=4" />
          </GridItem>
          <GridItem area="user" placeItems="center">
            <Text lineClamp={1}>taroj1205</Text>
            <Text color="muted" lineClamp={1}>
              10 minutes ago
            </Text>
          </GridItem>
          <GridItem area="content">
            <Box
              sx={{
                "& a": {
                  color: "var(--ui-colors-link)",
                  textDecoration: "underline",
                },
              }}
              dangerouslySetInnerHTML={{
                __html: `<p>I use <a href="https://heroku.com/" rel="noopener noreferrer" target="_blank">Heroku</a> to host my Node.js application, but MongoDB add-on appears to be too <strong>expensive</strong>. I consider switching to <a href="https://www.digitalocean.com/" rel="noopener noreferrer" target="_blank">Digital Ocean</a> VPS to save some cash.</p>`,
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
