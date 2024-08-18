import { InstagramIcon, TwitterIcon, YoutubeIcon } from "@yamada-ui/lucide"
import {
  ButtonGroup,
  Divider,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from "@yamada-ui/react"
import type { FC } from "react"

const FooterCentered: FC = () => {
  return (
    <VStack as="footer" gap="0" placeItems="center">
      <Divider />
      <Flex
        w="full"
        justifyContent="space-between"
        alignItems="center"
        flexDir={{ sm: "column" }}
        gap={{ sm: "sm" }}
        px="md"
        py="lg"
        maxW="6xl"
      >
        <HStack gap="sm">
          <Image src="/favicon.svg" width={30} height={30} alt="Yamada UI" />
          <Text fontSize="lg">Yamada UI</Text>
        </HStack>
        <ButtonGroup gap="xs">
          <IconButton
            variant="ghost"
            borderRadius="full"
            icon={<TwitterIcon fontSize="2xl" />}
          />
          <IconButton
            variant="ghost"
            borderRadius="full"
            icon={<YoutubeIcon fontSize="2xl" />}
          />
          <IconButton
            variant="ghost"
            borderRadius="full"
            icon={<InstagramIcon fontSize="2xl" />}
          />
        </ButtonGroup>
      </Flex>
    </VStack>
  )
}

export default FooterCentered
