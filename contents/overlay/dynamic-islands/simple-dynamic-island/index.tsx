import {
  Avatar,
  Center,
  Link,
  Motion,
  useDisclosure,
  useOutsideClick,
} from "@yamada-ui/react"
import type { FC} from "react";
import { useRef } from "react"

const SimpleDynamicIsland: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const ref = useRef<HTMLDivElement>(null)

  const handleExpand = () => {
    if (isOpen) {
      onClose()
    } else {
      onOpen()
    }
  }

  useOutsideClick({
    ref,
    handler: () => {
      if (isOpen) {
        onClose()
      }
    },
  })

  return (
    <Center
      as={Motion}
      initial={{ width: 200, height: 60 }}
      animate={{
        width: isOpen ? 300 : 200,
        height: 60,
        transition: { duration: 0.5 },
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
      rounded="lg"
      px="md"
      ref={ref}
    >
      <Avatar size="sm" />

      {isOpen ? (
        <Motion
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Center gap="md">
            <Link
              href="/"
              onClick={(e) => e.preventDefault()}
              fontWeight="bold"
              fontSize="md"
            >
              Link 1
            </Link>
            <Link
              href="/"
              onClick={(e) => e.preventDefault()}
              fontWeight="bold"
              fontSize="md"
            >
              Link 2
            </Link>
            <Link
              href="/"
              onClick={(e) => e.preventDefault()}
              fontWeight="bold"
              fontSize="md"
            >
              Link 3
            </Link>
          </Center>
        </Motion>
      ) : null}
    </Center>
  )
}

export default SimpleDynamicIsland
