import {
  Box,
  Divider,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
} from "@yamada-ui/react"
import { Instagram, Twitter, Youtube } from "lucide-react"
import type { FC } from "react"

const FooterCentered: FC = () => {
  return (
    <Box pt="4xl" containerType="inline-size">
      <Divider />
      <Flex
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
        p="md"
        maxW="6xl"
        mx="auto"
      >
        <HStack gap="sm">
          <Image src="/favicon.svg" width={30} height={30} alt="Yamada UI" />
          <Text fontSize="lg">Yamada UI</Text>
        </HStack>
        <Flex gap="xs">
          <IconButton variant="ghost" borderRadius="full" icon={<Twitter />} />
          <IconButton variant="ghost" borderRadius="full" icon={<Youtube />} />
          <IconButton
            variant="ghost"
            borderRadius="full"
            icon={<Instagram />}
          />
        </Flex>
      </Flex>
    </Box>
  )
}

export default FooterCentered
