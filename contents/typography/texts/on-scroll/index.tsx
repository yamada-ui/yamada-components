import type { FC } from "react"
import { Flex, ScrollArea, Text } from "@yamada-ui/react"
import { useEffect, useRef, useState } from "react"

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
      ref={contentRef}
      type="always"
      maxH="lg"
      w="full"
      onScrollPositionChange={({ y }) => {
        if (contentRef.current) {
          setScrollTop((y / maxScrollTop.current) * text.length)
        }
      }}
    >
      <Flex h="100vh" justifyContent="center" minH="xl" position="relative">
        <Text
          bgClip="text"
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          fontWeight="bold"
          maxW="xl"
          position="fixed"
          pt="md"
          textAlign="center"
          z="-1"
        >
          {text.split("").map((char, index) => (
            <Text
              key={index}
              as="span"
              color={scrollTop <= index ? ["black", "white"] : undefined}
              opacity={scrollTop <= index ? "0.8" : undefined}
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
