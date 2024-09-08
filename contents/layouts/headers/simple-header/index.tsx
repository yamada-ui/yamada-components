import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Heading,
  IconButton,
  useDisclosure,
} from "@yamada-ui/react"
import type { FC } from "react"
import { useState } from "react"

const links = [
  { link: "/about", label: "Features" },
  { link: "/pricing", label: "Pricing" },
  { link: "/learn", label: "Learn" },
  { link: "/community", label: "Community" },
]

const HeaderSimple: FC = () => {
  const [active, setActive] = useState<string>(links[0].label)
  const { isOpen, onToggle } = useDisclosure()

  const items = links.map((link) => (
    <Button
      key={link.label}
      variant={active === link.label ? "solid" : "ghost"}
      colorScheme={active === link.label ? "primary" : undefined}
      as="a"
      href={link.link}
      data-active={active === link.label || undefined}
      fontSize="xs"
      px="sm"
      py="xs"
      lineHeight="1"
      size="sm"
      borderRadius="sm"
      fontWeight={500}
      onClick={(event) => {
        event.preventDefault()
        setActive(link.label)
      }}
    >
      {link.label}
    </Button>
  ))

  return (
    <Box as="header" p="md" borderBottomWidth="1">
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
        <ButtonGroup display={{ md: "none", base: "flex" }} gap="sm" as="nav">
          {items}
        </ButtonGroup>
        <IconButton
          title="Menu"
          type="button"
          variant="unstyled"
          p="1"
          onClick={onToggle}
          display={{ md: "block", base: "none" }}
          icon={
            <>
              <Box
                position="absolute"
                width="24px"
                height="1px"
                transform={isOpen ? "rotate(45deg)" : "translateY(-8px)"}
                bg={["black", "white"]}
                transitionDuration="300ms"
                transitionProperty="all"
              />
              <Box
                position="absolute"
                width="24px"
                height="1px"
                transform={isOpen ? "translateX(20px)" : undefined}
                opacity={isOpen ? 0 : 1}
                bg={["black", "white"]}
                transitionDuration="400ms"
                transitionProperty="all"
              />
              <Box
                position="absolute"
                width="24px"
                height="1px"
                transform={isOpen ? "rotate(-45deg)" : "translateY(8px)"}
                bg={["black", "white"]}
                transitionDuration="300ms"
                transitionProperty="all"
              />
            </>
          }
        />
      </Container>
    </Box>
  )
}

export default HeaderSimple
