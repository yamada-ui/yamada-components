import { Search } from "@yamada-ui/lucide"
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
} from "@yamada-ui/react"
import type { FC } from "react"

const links = [
  { link: "/about", label: "Features" },
  { link: "/pricing", label: "Pricing" },
  { link: "/learn", label: "Learn" },
  { link: "/community", label: "Community" },
]

const WithSearch: FC = () => {
  const { isOpen, onToggle } = useDisclosure()
  const items = links.map((link) => (
    <Button
      key={link.label}
      variant="ghost"
      as="a"
      href={link.link}
      fontSize="xs"
      px="3"
      py="sm"
      size="sm"
      borderRadius="sm"
      fontWeight={500}
      onClick={(event) => {
        event.preventDefault()
      }}
    >
      {link.label}
    </Button>
  ))
  return (
    <Flex
      as="header"
      h="14"
      px="md"
      justifyContent="space-between"
      alignItems="center"
      borderBottomWidth="1"
    >
      <HStack gap="md">
        <IconButton
          title="Menu"
          type="button"
          variant="unstyled"
          display={{ base: "none", md: "flex" }}
          placeContent="center"
          placeItems="center"
          p="1"
          size="sm"
          onClick={onToggle}
          icon={
            <>
              <Box
                position="absolute"
                width="24px"
                height="2px"
                transform={isOpen ? "rotate(45deg)" : "translateY(-8px)"}
                bg={["black", "white"]}
                transitionDuration="300ms"
                transitionProperty="all"
              />

              <Box
                position="absolute"
                width="24px"
                height="2px"
                transform={isOpen ? "translateX(20px)" : undefined}
                opacity={isOpen ? 0 : 1}
                bg={["black", "white"]}
                transitionDuration="400ms"
                transitionProperty="all"
              />

              <Box
                position="absolute"
                width="24px"
                height="2px"
                transform={isOpen ? "rotate(-45deg)" : "translateY(8px)"}
                bg={["black", "white"]}
                transitionDuration="300ms"
                transitionProperty="all"
              />
            </>
          }
        />
        <HStack gap="sm">
          <Image src="/favicon.svg" width={30} height={30} alt="Yamada UI" />
          <Heading as="a" fontSize="lg" whiteSpace="nowrap">
            Yamada UI
          </Heading>
        </HStack>
      </HStack>
      <HStack>
        <ButtonGroup display={{ md: "none", base: "flex" }} gap="xs" as="nav">
          {items}
        </ButtonGroup>
        <InputGroup size="sm" display={{ sm: "none" }}>
          <InputLeftElement>
            <Search color="gray.500" />
          </InputLeftElement>
          <Input placeholder="Search" />
        </InputGroup>
      </HStack>
    </Flex>
  )
}

export default WithSearch
