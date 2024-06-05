import {
  Box,
  HStack,
  Heading,
  IconButton,
  Link,
  SegmentedControl,
  SegmentedControlButton,
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
    <SegmentedControlButton
      key={link.label}
      as={Link}
      href={link.link}
      value={link.label}
      data-active={active === link.link || undefined}
      _hover={{ textDecor: "none" }}
      onClick={(event) => {
        event.preventDefault()
        setActive(link.label)
      }}
    >
      {link.label}
    </SegmentedControlButton>
  ))

  return (
    <HStack as="header" py="sm" px="md">
      <Box flex={1}>
        <Heading
          as="a"
          size="lg"
          whiteSpace="nowrap"
          onClick={(e) => e.preventDefault()}
        >
          Yamada UI
        </Heading>
      </Box>

      <SegmentedControl
        _container={[{ maxW: "750px", css: { display: "none" } }]}
        gap={0}
        as="nav"
        value={active}
      >
        {items}
      </SegmentedControl>

      <IconButton
        title="Menu"
        type="button"
        variant="unstyled"
        p="1"
        onClick={onToggle}
        _container={[{ minW: "750px", css: { display: "none" } }]}
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
    </HStack>
  )
}

export default HeaderSimple
