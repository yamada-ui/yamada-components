import { HStack, Reorder, ReorderItem, Text, VStack } from "@yamada-ui/react"
import type { FC } from "react"

const elements = [
  {
    letter: "C",
    name: "Carbon",
    position: 6,
    mass: 12.011,
  },
  {
    letter: "N",
    name: "Nitrogen",
    position: 7,
    mass: 14.007,
  },
  {
    letter: "Y",
    name: "Yttrium",
    position: 39,
    mass: 88.906,
  },
  {
    letter: "Ba",
    name: "Barium",
    position: 56,
    mass: 137.33,
  },
  {
    letter: "Ce",
    name: "Cerium",
    position: 58,
    mass: 140.12,
  },
]

const List: FC = () => {
  return (
    <Reorder maxW="xl">
      {elements.map((item) => (
        <ReorderItem key={item.name} value={item.name}>
          <HStack>
            <Text
              fontSize="5xl"
              fontWeight="semibold"
              minW="16"
              textAlign="center"
            >
              {item.letter}
            </Text>
            <VStack gap="0">
              <Text>{item.name}</Text>
              <Text color={["blackAlpha.600", "whiteAlpha.600"]}>
                Position: {item.position} • Mass: {item.mass}
              </Text>
            </VStack>
          </HStack>
        </ReorderItem>
      ))}
    </Reorder>
  )
}

export default List
