import type { FC } from "react"
import { HStack, Reorder, ReorderItem, Text, VStack } from "@yamada-ui/react"

const elements = [
  {
    name: "Carbon",
    letter: "C",
    mass: 12.011,
    position: 6,
  },
  {
    name: "Nitrogen",
    letter: "N",
    mass: 14.007,
    position: 7,
  },
  {
    name: "Yttrium",
    letter: "Y",
    mass: 88.906,
    position: 39,
  },
  {
    name: "Barium",
    letter: "Ba",
    mass: 137.33,
    position: 56,
  },
  {
    name: "Cerium",
    letter: "Ce",
    mass: 140.12,
    position: 58,
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
