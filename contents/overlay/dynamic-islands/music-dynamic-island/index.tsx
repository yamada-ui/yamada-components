import type { FC } from "react"
import {
  AudioLinesIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ImageIcon,
  PauseIcon,
  PlayIcon,
} from "@yamada-ui/lucide"
import {
  AnimatePresence,
  Box,
  ButtonGroup,
  Center,
  HStack,
  IconButton,
  Motion,
  Progress,
  Text,
  useBoolean,
  useBreakpointValue,
  useDisclosure,
  useOutsideClick,
} from "@yamada-ui/react"
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
              <ImageIcon color="white" fontSize="xl" />
            </Center>
            <Center
              as={Motion}
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              position="absolute"
              right="md"
            >
              <AudioLinesIcon color="white" fontSize="xl" />
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
          px="md"
          transition={{ delay: 0.2, duration: 0.5 }}
          w="full"
          width="full"
        >
          <HStack justify="space-between" w="full">
            <ImageIcon color="white" fontSize="4xl" />
            <Box flex="1" ml="md">
              <Text color="white" fontSize="lg">
                Your Song Title
              </Text>
              <Text color="whiteAlpha.700" fontSize="sm">
                Artist Name
              </Text>
            </Box>
            <AudioLinesIcon color="white" fontSize="2xl" />
          </HStack>

          <HStack w="full">
            <Text color="whiteAlpha.700" fontSize="xs">
              0:30
            </Text>
            <Progress
              size="sm"
              bg="whiteAlpha.200"
              filledTrackColor="white"
              flex="1"
              hasStripe
              isStripeAnimation
              rounded="full"
              value={(30 / (120 + 45)) * 100}
            />
            <Text color="whiteAlpha.700" fontSize="xs">
              -2:45
            </Text>
          </HStack>

          <ButtonGroup as={Center} size="lg" variant="ghost">
            <IconButton
              colorScheme="whiteAlpha"
              aria-label="Previous"
              icon={<ChevronLeftIcon fontSize="xl" />}
              _hover={{
                bg: "whiteAlpha.50",
              }}
              onClick={handlePrev}
            />
            <IconButton
              colorScheme="whiteAlpha"
              aria-label={isPlaying ? "Pause" : "Play"}
              icon={
                isPlaying ? (
                  <PauseIcon fontSize="xl" />
                ) : (
                  <PlayIcon fontSize="xl" />
                )
              }
              _hover={{
                bg: "whiteAlpha.50",
              }}
              onClick={(event) => {
                event.stopPropagation()
                toggle()
              }}
            />
            <IconButton
              colorScheme="whiteAlpha"
              aria-label="Next"
              icon={<ChevronRightIcon fontSize="xl" />}
              _hover={{
                bg: "whiteAlpha.50",
              }}
              onClick={handleNext}
            />
          </ButtonGroup>
        </Motion>
      ) : null}
      <audio ref={audioRef} />
    </Motion>
  )
}

export default MusicDynamicIsland
