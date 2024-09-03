import {
  Avatar,
  Center,
  Link,
  Motion,
  useDisclosure,
  useOutsideClick,
} from "@yamada-ui/react"
import type { FC } from "react"
import { useRef } from "react"

const DynamicIsland: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const ref = useRef<HTMLDivElement>(null)

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

  return (
    <Center
      as={Motion}
      initial={{ width: 200, height: 32, paddingInline: "0.4rem" }}
      animate={{
        width: isOpen ? 300 : 200,
        height: isOpen ? 60 : 32,
        paddingInline: isOpen ? "1rem" : "0.4rem",
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
      rounded="full"
      ref={ref}
    >
      <Avatar
        as={Motion}
        initial={{ height: 24, width: 24 }}
        animate={{
          height: isOpen ? 32 : 24,
          width: isOpen ? 32 : 24,
        }}
      />

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

export default DynamicIsland
