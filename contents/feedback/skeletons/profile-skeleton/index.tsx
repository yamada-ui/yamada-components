import {
  Container,
  Button,
  SkeletonCircle,
  Avatar,
  Skeleton,
  SkeletonText,
  Text,
  Grid,
  GridItem,
  Loading,
} from "@yamada-ui/react"
import { useEffect, useState, type FC } from "react"

const ProfileSkeleton: FC = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true)
    }, 1000)
  }, [])

  const Reload = () => {
    setIsLoaded(false)
    setTimeout(() => {
      setIsLoaded(true)
    }, 1000)
  }

  return (
    <Container alignItems="center" h="min">
      <Grid
        templateAreas={`
        "avatar name reload"
        "description description description"
        `}
        gridTemplateColumns="auto 1fr auto"
        gap="sm"
        maxW="md"
      >
        <GridItem gridArea="avatar">
          <SkeletonCircle isLoaded={isLoaded} fadeDuration={2}>
            <Avatar src="https://avatars.githubusercontent.com/u/157810570?v=4" />
          </SkeletonCircle>
        </GridItem>
        <GridItem gridArea="name">
          <Skeleton isLoaded={isLoaded} fadeDuration={2}>
            <Text fontSize="xl">Kaito Suzuki</Text>
            <Text fontSize="sm" textColor="gray">
              @kaito_bq
            </Text>
          </Skeleton>
        </GridItem>
        <GridItem gridArea="reload">
          <Button onClick={Reload} width="28">
            {isLoaded ? "Reload" : <Loading size="2xl" />}
          </Button>
        </GridItem>
        <GridItem gridArea="description">
          <SkeletonText isLoaded={isLoaded} fadeDuration={2}>
            <SkeletonText isLoaded={isLoaded} lineClamp={1} textHeight={6}>
              <Text fontSize="md">
                A student engineer who is studying front-end and back-end.
              </Text>
            </SkeletonText>
          </SkeletonText>
        </GridItem>
      </Grid>
    </Container>
  )
}

export default ProfileSkeleton
