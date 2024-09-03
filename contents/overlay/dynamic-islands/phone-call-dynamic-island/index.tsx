import { PhoneIcon, MicOffIcon, MicIcon, PhoneOffIcon } from "@yamada-ui/lucide"
import {
  Center,
  Motion,
  useDisclosure,
  useOutsideClick,
  IconButton,
  Text,
  Box,
  ButtonGroup,
  HStack,
  VStack,
  AnimatePresence,
} from "@yamada-ui/react"
import type { FC} from "react";
import { useRef, useState } from "react"

const PhoneCallDynamicIsland: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const ref = useRef<HTMLDivElement>(null)
  const [isMuted, setIsMuted] = useState(false)

  useOutsideClick({
    ref,
    handler: () => {
      if (isOpen) {
        onClose()
      }
    },
  })

  const handleExpand = () => {
    if (isOpen) {
      onClose()
    } else {
      onOpen()
    }
  }

  const toggleMute = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setIsMuted(!isMuted)
  }

  const handleEndCall = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
  }

  return (
    <Center
      as={Motion}
      initial={{
        width: 200,
        height: 32,
        paddingInline: "0.4rem",
        borderRadius: 99999,
      }}
      animate={{
        width: isOpen ? 400 : 200,
        height: isOpen ? 200 : 32,
        paddingInline: isOpen ? "1rem" : "0.4rem",
        borderRadius: isOpen ? 50 : 100,
      }}
      onClick={handleExpand}
      bg={["black", "blackAlpha.600"]}
      shadow="xl"
      justifyContent="space-between"
      cursor="pointer"
      position="fixed"
      top="md"
      left="50%"
      transform="translateX(-50%)"
      ref={ref}
    >
      <AnimatePresence>
        {!isOpen && (
          <>
            <Center
              as={Motion}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
              }}
              position="absolute"
              left="sm"
            >
              <PhoneIcon color="success" fontSize="xl" />
            </Center>
            <Center
              as={Motion}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
              }}
              position="absolute"
              right="sm"
            >
              <Text fontSize="sm" color="white">
                00:25
              </Text>
            </Center>
          </>
        )}
      </AnimatePresence>

      {isOpen && (
        <VStack
          as={Motion}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, paddingInline: "1.5rem" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Center gap="md" flexDir="column">
            <Center width="full">
              <PhoneIcon color="white" fontSize="6xl" />
              <Box ml="md" flex="1">
                <Text fontSize="lg" color="white">
                  John Doe
                </Text>
                <Text fontSize="sm" color="whiteAlpha.700">
                  Mobile
                </Text>
              </Box>
            </Center>

            <HStack w="full" justifyContent="space-between">
              <Text fontSize="xs" color="whiteAlpha.700">
                00:25
              </Text>
              <Text fontSize="xs" color="whiteAlpha.700">
                Ongoing Call
              </Text>
            </HStack>

            <ButtonGroup size="lg" variant="ghost" gap="md">
              <IconButton
                aria-label={isMuted ? "Unmute" : "Mute"}
                icon={
                  isMuted ? (
                    <MicOffIcon fontSize="xl" />
                  ) : (
                    <MicIcon fontSize="xl" />
                  )
                }
                onClick={toggleMute}
                colorScheme="whiteAlpha"
              />
              <IconButton
                aria-label="End Call"
                icon={<PhoneOffIcon fontSize="xl" />}
                onClick={handleEndCall}
                colorScheme="danger"
              />
            </ButtonGroup>
          </Center>
        </VStack>
      )}
    </Center>
  )
}

export default PhoneCallDynamicIsland
