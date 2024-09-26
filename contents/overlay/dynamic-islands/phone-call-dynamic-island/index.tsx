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
  AnimatePresence,
  useBreakpointValue,
} from "@yamada-ui/react"
import type { FC } from "react"
import { useRef, useState } from "react"

const PhoneCallDynamicIsland: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const ref = useRef<HTMLDivElement>(null)
  const [isMuted, setIsMuted] = useState(false)
  const width = useBreakpointValue({
    base: 380,
    md: 320,
  })

  useOutsideClick({
    ref,
    handler: () => {
      if (isOpen) onClose()
    },
  })

  const handleExpand = () => {
    if (!isOpen) onOpen()
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
        height: 40,
        paddingInline: "0.4rem",
        paddingBlock: "0.5rem",
      }}
      animate={{
        width: isOpen ? width : 200,
        height: isOpen ? 200 : 40,
        paddingInline: isOpen ? "1rem" : "0.4rem",
        paddingBlock: isOpen ? "1.5rem" : "0.5rem",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={handleExpand}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      bg={["black", "blackAlpha.600"]}
      shadow="xl"
      justifyContent="space-between"
      cursor="pointer"
      position="fixed"
      bottom="lg"
      left="50%"
      transform="translateX(-50%)"
      rounded="3xl"
      ref={ref}
    >
      <AnimatePresence>
        {!isOpen && (
          <>
            <Center
              as={Motion}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              position="absolute"
              left="md"
            >
              <PhoneIcon color="success" fontSize="xl" />
            </Center>
            <Center
              as={Motion}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              position="absolute"
              right="md"
            >
              <Text fontSize="sm" color="white">
                00:25
              </Text>
            </Center>
          </>
        )}
      </AnimatePresence>

      {isOpen && (
        <Motion
          display="flex"
          flexDirection="column"
          alignItems="stretch"
          w="full"
          gap="md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          width="full"
          paddingInline="lg"
        >
          <HStack w="full" justify="space-between">
            <PhoneIcon color="white" fontSize="4xl" />
            <Box ml="md" flex="1">
              <Text fontSize="lg" color="white">
                John Doe
              </Text>
              <Text fontSize="sm" color="whiteAlpha.700">
                Mobile
              </Text>
            </Box>
          </HStack>

          <HStack w="full" justifyContent="space-between">
            <Text fontSize="xs" color="whiteAlpha.700">
              00:25
            </Text>
            <Text fontSize="xs" color="whiteAlpha.700">
              Ongoing Call
            </Text>
          </HStack>

          <ButtonGroup as={Center} size="lg" variant="ghost" gap="md">
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
              _hover={{
                bg: "whiteAlpha.50",
              }}
            />
            <IconButton
              aria-label="End Call"
              icon={<PhoneOffIcon fontSize="xl" />}
              onClick={handleEndCall}
              colorScheme="danger"
              _hover={{
                bg: "whiteAlpha.50",
              }}
            />
          </ButtonGroup>
        </Motion>
      )}
    </Center>
  )
}

export default PhoneCallDynamicIsland
