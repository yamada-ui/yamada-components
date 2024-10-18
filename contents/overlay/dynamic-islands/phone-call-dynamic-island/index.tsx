import type { FC } from "react"
import { MicIcon, MicOffIcon, PhoneIcon, PhoneOffIcon } from "@yamada-ui/lucide"
import {
  AnimatePresence,
  Box,
  ButtonGroup,
  Center,
  HStack,
  IconButton,
  Motion,
  Text,
  useBreakpointValue,
  useDisclosure,
  useOutsideClick,
} from "@yamada-ui/react"
import { useRef, useState } from "react"

const PhoneCallDynamicIsland: FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()
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
    <Motion
      ref={ref}
      alignItems="center"
      animate={{
        height: isOpen ? 200 : 40,
        paddingBlock: isOpen ? "1.5rem" : "0.5rem",
        paddingInline: isOpen ? "1rem" : "0.4rem",
        width: isOpen ? width : 200,
      }}
      bg={["black", "blackAlpha.600"]}
      bottom="lg"
      cursor="pointer"
      display="flex"
      initial={{
        height: 40,
        paddingBlock: "0.5rem",
        paddingInline: "0.4rem",
        width: 200,
      }}
      justifyContent="space-between"
      left="50%"
      position="fixed"
      rounded="3xl"
      shadow="xl"
      transform="translateX(-50%)"
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      onClick={handleExpand}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <AnimatePresence>
        {!isOpen && (
          <>
            <Center
              as={Motion}
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              left="md"
              position="absolute"
            >
              <PhoneIcon color="success" fontSize="xl" />
            </Center>
            <Center
              as={Motion}
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              position="absolute"
              right="md"
            >
              <Text color="white" fontSize="sm">
                00:25
              </Text>
            </Center>
          </>
        )}
      </AnimatePresence>

      {isOpen ? (
        <Motion
          alignItems="stretch"
          animate={{ opacity: 1 }}
          display="flex"
          flexDirection="column"
          gap="md"
          initial={{ opacity: 0 }}
          paddingInline="lg"
          transition={{ delay: 0.2, duration: 0.5 }}
          w="full"
          width="full"
        >
          <HStack justify="space-between" w="full">
            <PhoneIcon color="white" fontSize="4xl" />
            <Box flex="1" ml="md">
              <Text color="white" fontSize="lg">
                John Doe
              </Text>
              <Text color="whiteAlpha.700" fontSize="sm">
                Mobile
              </Text>
            </Box>
          </HStack>

          <HStack justifyContent="space-between" w="full">
            <Text color="whiteAlpha.700" fontSize="xs">
              00:25
            </Text>
            <Text color="whiteAlpha.700" fontSize="xs">
              Ongoing Call
            </Text>
          </HStack>

          <ButtonGroup as={Center} size="lg" variant="ghost" gap="md">
            <IconButton
              colorScheme="whiteAlpha"
              aria-label={isMuted ? "Unmute" : "Mute"}
              icon={
                isMuted ? (
                  <MicOffIcon fontSize="xl" />
                ) : (
                  <MicIcon fontSize="xl" />
                )
              }
              _hover={{
                bg: "whiteAlpha.50",
              }}
              onClick={toggleMute}
            />
            <IconButton
              colorScheme="danger"
              aria-label="End Call"
              icon={<PhoneOffIcon fontSize="xl" />}
              _hover={{
                bg: "whiteAlpha.50",
              }}
              onClick={handleEndCall}
            />
          </ButtonGroup>
        </Motion>
      ) : null}
    </Motion>
  )
}

export default PhoneCallDynamicIsland
