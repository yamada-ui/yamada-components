import {
  Box,
  Container,
  HStack,
  Heading,
  Link,
  SegmentedControl,
  SegmentedControlButton,
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

  const items = links.map((link) => (
    <SegmentedControlButton
      key={link.label}
      as={Link}
      href={link.link}
      value={link.label}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault()
        setActive(link.label)
      }}
    >
      {link.label}
    </SegmentedControlButton>
  ))

  return (
    <header>
      <Container size="md">
        <HStack minW="517px">
          <Box flex={1}>
            <Heading
              size="lg"
              color="white"
              _hover={{ textDecor: "none" }}
              onClick={(e) => e.preventDefault()}
            >
              Yamada UI
            </Heading>
          </Box>
          <SegmentedControl gap={0} as="nav" value={active}>
            {items}
          </SegmentedControl>
        </HStack>
      </Container>
    </header>
  )
}

export default HeaderSimple
