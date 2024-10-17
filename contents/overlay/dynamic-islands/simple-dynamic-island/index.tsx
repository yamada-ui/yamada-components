import type { FC } from "react"
import {
  Avatar,
  Center,
  Link,
  Motion,
  useBreakpointValue,
  useDisclosure,
  useOutsideClick,
} from "@yamada-ui/react"
import { useRef } from "react"

const DynamicIsland: FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { isOpen, onClose, onOpen, onToggle } = useDisclosure()
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

  return (
    <Motion
      ref={ref}
      alignItems="center"
      animate={{
        height: isOpen ? 60 : 40,
        paddingBlock: isOpen ? "1rem" : "0.5rem",
        paddingInline: isOpen ? "1rem" : "0.5rem",
        width: isOpen ? width : 250,
      }}
      bg={["black", "blackAlpha.600"]}
      bottom="lg"
      cursor="pointer"
      display="flex"
      initial={{
        height: 40,
        paddingBlock: "0.5rem",
        paddingInline: "0.5rem",
        width: 250,
      }}
      justifyContent="space-between"
      left="50%"
      position="fixed"
      rounded="full"
      shadow="2xl"
      transform="translateX(-50%)"
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      onClick={onToggle}
      onHoverEnd={onClose}
      onHoverStart={onOpen}
    >
      <Avatar
        as={Motion}
        animate={{
          height: isOpen ? 42 : 24,
          width: isOpen ? 42 : 24,
        }}
        initial={{ height: 24, width: 24 }}
      />

      {isOpen ? (
        <Motion
          animate={{ opacity: 1, translateY: 0 }}
          initial={{ opacity: 0, translateY: -10 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <Center gap="md" px="md">
            <Link
              href="/"
              color="white"
              fontSize="md"
              fontWeight="semibold"
              _hover={{ color: "gray.400" }}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
            >
              Link 1
            </Link>
            <Link
              href="/"
              color="white"
              fontSize="md"
              fontWeight="semibold"
              _hover={{ color: "gray.400" }}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
            >
              Link 2
            </Link>
            <Link
              href="/"
              color="white"
              fontSize="md"
              fontWeight="semibold"
              _hover={{ color: "gray.400" }}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
            >
              Link 3
            </Link>
          </Center>
        </Motion>
      ) : null}
    </Motion>
  )
}

export default DynamicIsland
