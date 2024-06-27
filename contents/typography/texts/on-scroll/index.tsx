import { Box, ScrollArea, Text } from "@yamada-ui/react"
import { useState, useRef, type FC } from "react"

const OnScroll: FC = () => {
  const [scrollTop, setScrollTop] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)

  const text =
    "Yamada UI is a versatile React component library, unleashing the power of your application's animation and flexibility. It provides an intuitive and efficient way to integrate advanced styling into your application, bringing your ideas to life."

  return (
    <ScrollArea
      onScrollPositionChange={({ y }) => {
        if (contentRef.current) {
          const maxScrollTop =
            contentRef.current.scrollHeight - contentRef.current.clientHeight
          setScrollTop((y / maxScrollTop) * text.length)
        }
      }}
      maxH="lg"
      type="always"
      ref={contentRef}
    >
      <Box minH="xl" h="100vh">
        <Text
          position="fixed"
          top="0"
          pt="md"
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontWeight="semibold"
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
      </Box>
    </ScrollArea>
  )
}

export default OnScroll
