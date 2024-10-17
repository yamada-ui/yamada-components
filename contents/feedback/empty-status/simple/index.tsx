import type { FC } from "react"
import { Plus } from "@yamada-ui/lucide"
import { Button, Flex, Icon, Text, Wrap } from "@yamada-ui/react"
import CreditCardIcon from "./credit-card-icon"

const Simple: FC = () => {
  return (
    <Flex alignItems="center" direction="column" h="md" justifyContent="center">
      <Icon as={CreditCardIcon} />

      <Wrap
        alignItems="center"
        direction="column"
        justifyContent="center"
        marginBottom="md"
        marginTop="2xs"
      >
        <Text
          color={["black", "white"]}
          fontSize="2xl"
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
