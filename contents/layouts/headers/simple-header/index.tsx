import type { FC } from "react"
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Heading,
  IconButton,
  useDisclosure,
} from "@yamada-ui/react"
import { useState } from "react"

const links = [
  { label: "Features", link: "/about" },
  { label: "Pricing", link: "/pricing" },
  { label: "Learn", link: "/learn" },
  { label: "Community", link: "/community" },
]

const HeaderSimple: FC = () => {
  const [active, setActive] = useState<string>(links[0].label)
  const { isOpen, onToggle } = useDisclosure()

  const items = links.map((link) => (
    <Button
      key={link.label}
      as="a"
      href={link.link}
      colorScheme={active === link.label ? "primary" : undefined}
      size="sm"
      variant={active === link.label ? "solid" : "ghost"}
      data-active={active === link.label || undefined}
      borderRadius="sm"
      fontSize="xs"
      fontWeight={500}
      lineHeight="1"
      px="sm"
      py="xs"
      onClick={(event) => {
        event.preventDefault()
        setActive(link.label)
      }}
    >
      {link.label}
    </Button>
  ))

  return (
    <Box as="header" borderBottomWidth="1" p="md">
      <Container flexDir="row" maxW="6xl" mx="auto" p={0}>
        <Box flex={1}>
          <Heading
            as="a"
            size="md"
            whiteSpace="nowrap"
            onClick={(e) => e.preventDefault()}
          >
            Yamada UI
          </Heading>
        </Box>
        <ButtonGroup as="nav" display={{ base: "flex", md: "none" }} gap="sm">
          {items}
        </ButtonGroup>
        <IconButton
          type="button"
          variant="unstyled"
          display={{ base: "none", md: "block" }}
          icon={
            <>
              <Box
                bg={["black", "white"]}
                height="1px"
                position="absolute"
                transform={isOpen ? "rotate(45deg)" : "translateY(-8px)"}
                transitionDuration="300ms"
                transitionProperty="all"
                width="24px"
              />
              <Box
                bg={["black", "white"]}
                height="1px"
                opacity={isOpen ? 0 : 1}
                position="absolute"
                transform={isOpen ? "translateX(20px)" : undefined}
                transitionDuration="400ms"
                transitionProperty="all"
                width="24px"
              />
              <Box
                bg={["black", "white"]}
                height="1px"
                position="absolute"
                transform={isOpen ? "rotate(-45deg)" : "translateY(8px)"}
                transitionDuration="300ms"
                transitionProperty="all"
                width="24px"
              />
            </>
          }
          p="1"
          title="Menu"
          onClick={onToggle}
        />
      </Container>
    </Box>
  )
}

export default HeaderSimple
