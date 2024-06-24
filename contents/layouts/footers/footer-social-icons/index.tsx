import { Instagram, Twitter, Youtube } from "@yamada-ui/lucide"
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
        _container={[
          {
            maxW: "300px",
            css: {
              flexDirection: "column",
              gap: "sm",
            },
          },
        ]}
        px="md"
        py="lg"
        maxW="6xl"
      >
        <HStack gap="sm">
          <Image src="/favicon.svg" width={30} height={30} alt="Yamada UI" />
          <Text fontSize="lg">Yamada UI</Text>
        </HStack>
        <ButtonGroup>
          <IconButton variant="ghost" borderRadius="full" icon={<Twitter />} />
          <IconButton variant="ghost" borderRadius="full" icon={<Youtube />} />
          <IconButton
            variant="ghost"
            borderRadius="full"
            icon={<Instagram />}
          />
        </ButtonGroup>
      </Flex>
    </VStack>
  )
}

export default FooterCentered
