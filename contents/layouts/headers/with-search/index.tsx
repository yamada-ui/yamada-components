import type { FC } from "react"
import { Search } from "@yamada-ui/lucide"
import {
  Box,
  Button,
  ButtonGroup,
  Center,
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

const links = [
  { label: "Features", link: "/about" },
  { label: "Pricing", link: "/pricing" },
  { label: "Learn", link: "/learn" },
  { label: "Community", link: "/community" },
]

const WithSearch: FC = () => {
  const { isOpen, onToggle } = useDisclosure()
  const items = links.map((link) => (
    <Button
      key={link.label}
      as="a"
      href={link.link}
      size="sm"
      variant="ghost"
      borderRadius="sm"
      fontSize="xs"
      fontWeight={500}
      px="3"
      py="sm"
      onClick={(event) => {
        event.preventDefault()
      }}
    >
      {link.label}
    </Button>
  ))
  return (
    <Center as="header" borderBottomWidth="1" px="md">
      <Flex h="14" justifyContent="space-between" w="6xl">
        <HStack gap="md">
          <IconButton
            type="button"
            size="sm"
            variant="unstyled"
            display={{ base: "none", md: "flex" }}
            icon={
              <>
                <Box
                  bg={["black", "white"]}
                  height="2px"
                  position="absolute"
                  transform={isOpen ? "rotate(45deg)" : "translateY(-8px)"}
                  transitionDuration="300ms"
                  transitionProperty="all"
                  width="24px"
                />

                <Box
                  bg={["black", "white"]}
                  height="2px"
                  opacity={isOpen ? 0 : 1}
                  position="absolute"
                  transform={isOpen ? "translateX(20px)" : undefined}
                  transitionDuration="400ms"
                  transitionProperty="all"
                  width="24px"
                />

                <Box
                  bg={["black", "white"]}
                  height="2px"
                  position="absolute"
                  transform={isOpen ? "rotate(-45deg)" : "translateY(8px)"}
                  transitionDuration="300ms"
                  transitionProperty="all"
                  width="24px"
                />
              </>
            }
            placeContent="center"
            placeItems="center"
            title="Menu"
            onClick={onToggle}
          />
          <HStack gap="sm">
            <Image src="/favicon.svg" alt="Yamada UI" height={30} width={30} />
            <Heading as="a" fontSize="lg" whiteSpace="nowrap">
              Yamada UI
            </Heading>
          </HStack>
        </HStack>
        <HStack>
          <ButtonGroup as="nav" display={{ base: "flex", md: "none" }} gap="xs">
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
    </Center>
  )
}

export default WithSearch
