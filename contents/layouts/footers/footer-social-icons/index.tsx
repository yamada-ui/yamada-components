import type { FC } from "react"
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

const FooterCentered: FC = () => {
  return (
    <VStack as="footer" gap="0" placeItems="center">
      <Divider />
      <Flex
        alignItems="center"
        flexDir={{ sm: "column" }}
        gap={{ sm: "sm" }}
        justifyContent="space-between"
        maxW="6xl"
        px="md"
        py="lg"
        w="full"
      >
        <HStack gap="sm">
          <Image src="/favicon.svg" alt="Yamada UI" height={30} width={30} />
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
