import {
  Button,
  SkeletonCircle,
  Avatar,
  SkeletonText,
  Text,
  useBoolean,
  VStack,
  HStack,
  Skeleton,
} from "@yamada-ui/react"
import type { FC } from "react"

const ProfileSkeleton: FC = () => {
  const [isLoaded, { toggle }] = useBoolean()

  return (
    <VStack maxW="md" position="relative">
      <Button
        position="absolute"
        top="-xl"
        right="0"
        onClick={toggle}
        colorScheme="primary"
      >
        Toggle
      </Button>
      <HStack>
        <SkeletonCircle isLoaded={isLoaded} fadeDuration={2}>
          <Avatar src="https://avatars.githubusercontent.com/u/157810570?v=4" />
        </SkeletonCircle>
        <SkeletonText
          textHeight="base"
          lineClamp={1}
          isLoaded={isLoaded}
          fadeDuration={2}
        >
          <Text fontSize="xl">Kaito Suzuki</Text>

          <Text fontSize="sm" textColor="gray">
            @kaito_bq
          </Text>
        </SkeletonText>
      </HStack>
      <Skeleton isLoaded={isLoaded} fadeDuration={2}>
        <Text fontSize="md">
          A student engineer who is studying front-end and back-end.
        </Text>
      </Skeleton>
    </VStack>
  )
}

export default ProfileSkeleton
