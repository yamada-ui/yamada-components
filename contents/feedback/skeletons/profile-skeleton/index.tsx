import type { FC } from "react"
import {
  Avatar,
  Button,
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Text,
  useBoolean,
  VStack,
} from "@yamada-ui/react"

const ProfileSkeleton: FC = () => {
  const [isLoaded, { toggle }] = useBoolean()

  return (
    <VStack maxW="md">
      <Button colorScheme="primary" placeSelf="flex-end" onClick={toggle}>
        Toggle
      </Button>
      <HStack>
        <SkeletonCircle fadeDuration={2} isLoaded={isLoaded}>
          <Avatar src="https://avatars.githubusercontent.com/u/157810570?v=4" />
        </SkeletonCircle>
        <SkeletonText
          fadeDuration={2}
          isLoaded={isLoaded}
          lineClamp={1}
          textHeight="base"
        >
          <Text fontSize="xl">Kaito Suzuki</Text>

          <Text fontSize="sm" textColor="gray">
            @kaito_bq
          </Text>
        </SkeletonText>
      </HStack>
      <Skeleton fadeDuration={2} isLoaded={isLoaded}>
        <Text fontSize="md">
          A student engineer who is studying front-end and back-end.
        </Text>
      </Skeleton>
    </VStack>
  )
}

export default ProfileSkeleton
