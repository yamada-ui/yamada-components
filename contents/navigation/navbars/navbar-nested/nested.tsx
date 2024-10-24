import type { FC } from "@yamada-ui/react"
import type { LinksProps } from "./links"
import {
  Divider,
  Grid,
  LinkBox,
  LinkOverlay,
  memo,
  Text,
  VStack,
} from "@yamada-ui/react"

interface NestedProps {
  items: LinksProps[]
}

export const Nested: FC<NestedProps> = memo(({ items }) => {
  return (
    <Grid templateColumns="auto 1fr">
      <Divider
        borderLeftWidth="0"
        borderRightWidth="1px"
        orientation="vertical"
        pl="14px"
      />
      <VStack gap="0">
        {items.map((item) => (
          <LinkBox
            key={item.name}
            bg="transparent"
            fontSize="sm"
            px="md"
            py="calc($spaces.md - 5px)"
            transitionDuration="normal"
            transitionProperty="common"
            _hover={{ bg: ["blackAlpha.200", "blackAlpha.400"] }}
          >
            <Text>{item.name}</Text>
            <LinkOverlay href={item.href} onClick={(e) => e.preventDefault()} />
          </LinkBox>
        ))}
      </VStack>
    </Grid>
  )
})

Nested.displayName = "Nested"
