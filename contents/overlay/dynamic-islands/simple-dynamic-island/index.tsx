import {
  Avatar,
  Center,
  Link,
  Motion,
  useDisclosure,
  useBreakpointValue,
  useOutsideClick,
} from "@yamada-ui/react"
import type { FC } from "react"
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
    <Center
      as={Motion}
      initial={{
        width: 250,
        height: 40,
        paddingInline: "0.5rem",
        paddingBlock: "0.5rem",
      }}
      animate={{
        width: isOpen ? width : 250,
        height: isOpen ? 60 : 40,
        paddingInline: isOpen ? "1rem" : "0.5rem",
        paddingBlock: isOpen ? "1rem" : "0.5rem",
      }}
      onHoverStart={onOpen}
      onHoverEnd={onClose}
      onClick={onToggle}
      bg={["black", "blackAlpha.600"]}
      shadow="2xl"
      justifyContent="space-between"
      cursor="pointer"
      position="fixed"
      bottom="lg"
      left="50%"
      transform="translateX(-50%)"
      rounded="full"
      ref={ref}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Avatar
        as={Motion}
        initial={{ height: 24, width: 24 }}
        animate={{
          height: isOpen ? 42 : 24,
          width: isOpen ? 42 : 24,
        }}
      />

      {isOpen && (
        <Motion
          initial={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Center gap="lg">
            <Link
              href="/"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              fontWeight="semibold"
              fontSize="md"
              color="white"
              _hover={{ color: "gray.400" }}
            >
              Link 1
            </Link>
            <Link
              href="/"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              fontWeight="semibold"
              fontSize="md"
              color="white"
              _hover={{ color: "gray.400" }}
            >
              Link 2
            </Link>
            <Link
              href="/"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              fontWeight="semibold"
              fontSize="md"
              color="white"
              _hover={{ color: "gray.400" }}
            >
              Link 3
            </Link>
          </Center>
        </Motion>
      )}
    </Center>
  )
}

export default DynamicIsland
