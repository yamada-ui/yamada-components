import { Flex, ScrollArea, Text } from "@yamada-ui/react"
import { useState, useRef, type FC, useEffect } from "react"

const OnScroll: FC = () => {
  const [scrollTop, setScrollTop] = useState(0)
  const maxScrollTop = useRef(0)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      maxScrollTop.current =
        contentRef.current.scrollHeight - contentRef.current.clientHeight
    }
  }, [])

  const text =
    "Yamada UI is a versatile React component library, unleashing the power of your application's animation and flexibility. It provides an intuitive and efficient way to integrate advanced styling into your application, bringing your ideas to life."

  return (
    <ScrollArea
      onScrollPositionChange={({ y }) => {
        if (contentRef.current) {
          setScrollTop((y / maxScrollTop.current) * text.length)
        }
      }}
      maxH="lg"
      type="always"
      ref={contentRef}
      w="full"
    >
      <Flex justifyContent="center" minH="xl" h="100vh" position="relative">
        <Text
          position="fixed"
          pt="md"
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontWeight="semibold"
          maxW="xl"
          textAlign="center"
          z="-1"
        >
          {text.split("").map((char, index) => (
            <Text
              as="span"
              key={index}
              opacity={scrollTop <= index ? "0.8" : undefined}
              color={scrollTop <= index ? ["black", "white"] : undefined}
            >
              {char}
            </Text>
          ))}
        </Text>
      </Flex>
    </ScrollArea>
  )
}

export default OnScroll
