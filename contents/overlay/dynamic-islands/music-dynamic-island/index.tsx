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
  useDisclosure,
  useOutsideClick,
  IconButton,
  Text,
  Progress,
  Box,
  ButtonGroup,
  HStack,
  VStack,
  AnimatePresence,
} from "@yamada-ui/react"
import type { FC} from "react";
import { useRef, useState } from "react"

const MusicDynamicIsland: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const ref = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

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

  const togglePlayPause = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    if (audioRef.current) {
      setIsPlaying(!isPlaying)
    }
  }

  const handleNext = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
  }

  const handlePrev = (event: React.MouseEvent<HTMLButtonElement>) => {
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
              <ImageIcon color="white" fontSize="xl" />
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
              <AudioLinesIcon color="white" fontSize="xl" />
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
              <ImageIcon color="white" fontSize="6xl" />
              <Box ml="md" flex="1">
                <Text fontSize="lg" color="white">
                  Your Song Title
                </Text>
                <Text fontSize="sm" color="whiteAlpha.700">
                  Artist Name
                </Text>
              </Box>
              <AudioLinesIcon color="white" fontSize="2xl" />
            </Center>

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
                hasStripe
                isStripeAnimation
              />

              <Text fontSize="xs" color="whiteAlpha.700">
                -2:45
              </Text>
            </HStack>

            <ButtonGroup size="lg" variant="ghost">
              <IconButton
                aria-label="Previous"
                icon={<ChevronLeftIcon fontSize="xl" />}
                onClick={handlePrev}
                colorScheme="whiteAlpha"
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
                onClick={togglePlayPause}
                colorScheme="whiteAlpha"
              />
              <IconButton
                aria-label="Next"
                icon={<ChevronRightIcon fontSize="xl" />}
                onClick={handleNext}
                colorScheme="whiteAlpha"
              />
            </ButtonGroup>
            <audio ref={audioRef} />
          </Center>
        </VStack>
      )}
    </Center>
  )
}

export default MusicDynamicIsland
