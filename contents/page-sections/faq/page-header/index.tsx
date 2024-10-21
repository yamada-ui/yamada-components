import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  LinkBox,
  LinkOverlay,
  List,
  ListItem,
  Spacer,
  Text,
  VStack,
} from "@yamada-ui/react"
import { contacts } from "./contacts"
import { links } from "./links"

const WithPageHeader = () => {
  return (
    <Container centerContent maxW="calc($sizes.7xl - 2rem)" p="0">
      <Flex
        alignItems="center"
        bgGradient="linear(to-r, primary.400, primary.600)"
        flexDir={{ base: "row", xl: "column" }}
        gap="lg"
        px={{ base: "xl", xl: "md" }}
        py={{ base: "md", xl: "lg" }}
        rounded="2xl"
        w="full"
      >
        <VStack order={{ base: 1, xl: 3 }} w="fit-content">
          <Heading
            as="h1"
            color="whiteAlpha.300"
            display={{ xl: "none" }}
            fontSize="20rem"
            fontWeight={900}
            letterSpacing="tighter"
            lineHeight="0.7"
            pointerEvents="none"
            textAlign="center"
          >
            FAQ
          </Heading>
          <Heading
            as="h2"
            color="white"
            fontSize={{ base: "2.875rem", xl: "xl" }}
            fontWeight={800}
            letterSpacing="tighter"
            lineHeight="1.3"
            textAlign="center"
          >
            Frequently Asked Questions
          </Heading>
        </VStack>
        <Spacer display={{ xl: "none" }} order={2} />
        <List
          bg={["white", "black"]}
          gap="lg"
          maxW="sm"
          order={{ base: 3, xl: 1 }}
          p="xl"
          rounded="2xl"
          w="full"
        >
          <ListItem>
            <Heading as="h3" size="md" fontWeight="normal">
              Contact us
            </Heading>
          </ListItem>
          <ListItem>
            <List gap="md">
              {contacts.map((contact) => (
                <ListItem key={contact.name} as={HStack}>
                  <Center
                    bgGradient="linear(to-r, primary.400, primary.600)"
                    p="sm"
                    rounded="xl"
                  >
                    <contact.icon color="white" fontSize="2xl" />
                  </Center>
                  <VStack gap="0">
                    <Text color="muted" fontSize="xs">
                      {contact.name}
                    </Text>
                    <Text>{contact.value}</Text>
                  </VStack>
                </ListItem>
              ))}
            </List>
          </ListItem>
        </List>
      </Flex>
      <List flexDir={{ base: "row", md: "column" }} gap="md" w="full">
        {links.map((link) => (
          <LinkBox
            key={link.name}
            as={ListItem}
            className="group"
            h="calc($sizes.sm / 2)"
            overflow="clip"
            rounded="2xl"
            w={{ base: "md", md: "full" }}
          >
            <Center h="full" position="relative">
              <Image
                src={link.image}
                alt={link.name}
                h="full"
                left="0"
                objectFit="cover"
                position="absolute"
                top="0"
                transform="scale(1)"
                transition="transform 0.2s ease-in-out"
                w="full"
                _groupHover={{
                  transform: "scale(1.1)",
                }}
              />
              <Box
                bg="blackAlpha.700"
                h="full"
                left="0"
                position="absolute"
                top="0"
                w="full"
              />
              <Heading
                as="h4"
                size="md"
                color="white"
                pointerEvents="none"
                z="1"
              >
                {link.name}
              </Heading>
            </Center>
            <LinkOverlay
              href={link.href}
              target="_blank"
              onClick={(e) => e.preventDefault()}
            />
          </LinkBox>
        ))}
      </List>
    </Container>
  )
}

export default WithPageHeader
