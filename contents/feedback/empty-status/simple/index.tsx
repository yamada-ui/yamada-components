import { Plus } from "@yamada-ui/lucide"
import { Text, Button, Flex, Wrap, Icon } from "@yamada-ui/react"
import type { FC } from "react"
import { FaRegCreditCard } from "react-icons/fa6"

const Simple: FC = () => {
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" h="md">
      <Icon as={FaRegCreditCard} fontSize="80px" marginLeft="3px" />

      <Wrap
        direction="column"
        justifyContent="center"
        alignItems="center"
        margin="10px 0 25px 0"
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
