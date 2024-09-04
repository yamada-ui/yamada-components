import { Plus } from "@yamada-ui/lucide"
import { Text, Button, Flex, Wrap, Icon } from "@yamada-ui/react"
import type { FC } from "react"
import CreditCardIcon from "./credit-card-icon"

const Simple: FC = () => {
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" h="md">
      <Icon as={CreditCardIcon} />

      <Wrap
        direction="column"
        justifyContent="center"
        alignItems="center"
        marginTop="2xs"
        marginBottom="md"
      >
        <Text
          fontSize="2xl"
          color={["black", "white"]}
          fontWeight="medium"
          marginBottom="5px"
        >
          No Saved Cards
        </Text>
        <Text fontSize="lg" textAlign="center">
          There is no credit card information. Please register your credit card.
        </Text>
      </Wrap>

      <Button colorScheme="primary" fontSize="xl" leftIcon={<Plus />}>
        Add new card
      </Button>
    </Flex>
  )
}

export default Simple
