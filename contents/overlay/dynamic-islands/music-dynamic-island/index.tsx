import {
  PauseIcon,
  PlayIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  AudioLinesIcon,
  ImageIcon,
} from "@yamada-ui/lucide"
import {
  Center,
  Motion,
  useOutsideClick,
  IconButton,
  Text,
  Progress,
  Box,
  ButtonGroup,
  HStack,
  AnimatePresence,
  useDisclosure,
  useBreakpointValue,
  useBoolean,
} from "@yamada-ui/react"
import type { FC } from "react"
import { useRef } from "react"

const MusicDynamicIsland: FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [isPlaying, { toggle }] = useBoolean(false)
  const audioRef = useRef<HTMLAudioElement>(null)
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

  const handleNext = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
  }

  const handlePrev = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
  }

  return (
    <Motion
      display="flex"
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
      alignItems="center"
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
              <ImageIcon color="white" fontSize="xl" />
            </Center>
            <Center
              as={Motion}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              position="absolute"
              right="md"
            >
              <AudioLinesIcon color="white" fontSize="xl" />
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
          px="md"
        >
          <HStack w="full" justify="space-between">
            <ImageIcon color="white" fontSize="4xl" />
            <Box ml="md" flex="1">
              <Text fontSize="lg" color="white">
                Your Song Title
              </Text>
              <Text fontSize="sm" color="whiteAlpha.700">
                Artist Name
              </Text>
            </Box>
            <AudioLinesIcon color="white" fontSize="2xl" />
          </HStack>

          <HStack w="full">
            <Text fontSize="xs" color="whiteAlpha.700">
              0:30
            </Text>
            <Progress
              value={(30 / (120 + 45)) * 100}
              size="sm"
              bg="whiteAlpha.200"
              filledTrackColor="white"
              rounded="full"
              flex="1"
              hasStripe
              isStripeAnimation
            />
            <Text fontSize="xs" color="whiteAlpha.700">
              -2:45
            </Text>
          </HStack>

          <ButtonGroup as={Center} size="lg" variant="ghost">
            <IconButton
              aria-label="Previous"
              icon={<ChevronLeftIcon fontSize="xl" />}
              onClick={handlePrev}
              colorScheme="whiteAlpha"
              _hover={{
                bg: "whiteAlpha.50",
              }}
            />
            <IconButton
              aria-label={isPlaying ? "Pause" : "Play"}
              icon={
                isPlaying ? (
                  <PauseIcon fontSize="xl" />
                ) : (
                  <PlayIcon fontSize="xl" />
                )
              }
              onClick={(event) => {
                event.stopPropagation()
                toggle()
              }}
              colorScheme="whiteAlpha"
              _hover={{
                bg: "whiteAlpha.50",
              }}
            />
            <IconButton
              aria-label="Next"
              icon={<ChevronRightIcon fontSize="xl" />}
              onClick={handleNext}
              colorScheme="whiteAlpha"
              _hover={{
                bg: "whiteAlpha.50",
              }}
            />
          </ButtonGroup>
        </Motion>
      )}
      <audio ref={audioRef} />
    </Motion>
  )
}

export default MusicDynamicIsland
