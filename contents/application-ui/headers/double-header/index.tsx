import {
  Box,
  Container,
  HStack,
  Heading,
  Link,
  SegmentedControl,
  SegmentedControlButton,
  VStack,
} from "@yamada-ui/react"
import type { FC } from "react"
import { useState } from "react"

const userLinks = [
  { link: "#", label: "Privacy & Security" },
  { link: "#", label: "Account settings" },
  { link: "#", label: "Support options" },
]

const mainLinks = [
  { link: "#", label: "Book a demo" },
  { link: "#", label: "Documentation" },
  { link: "#", label: "Community" },
  { link: "#", label: "Academy" },
  { link: "#", label: "Forums" },
]

const DoubleHeader: FC = () => {
  const [active, setActive] = useState<string>(mainLinks[0].label)

  const mainItems = mainLinks.map((item) => (
    <SegmentedControlButton
      as={Link}
      href={item.link}
      key={item.label}
      value={item.label}
      w="fit-content"
      data-active={item.label === active || undefined}
      onClick={(event) => {
        event.preventDefault()
        setActive(item.label)
      }}
      _hover={{ textDecor: "none" }}
    >
      {item.label}
    </SegmentedControlButton>
  ))

  const secondaryItems = userLinks.map((item) => (
    <Link
      href={item.link}
      key={item.label}
      onClick={(event) => event.preventDefault()}
      _hover={{ textDecor: "none" }}
    >
      {item.label}
    </Link>
  ))

  return (
    <Box as="header">
      <Container>
        <HStack justifyContent="space-between" minW="715px">
          <Box flex={1}>
            <Heading
              size="lg"
              color="white"
              as={Link}
              _hover={{ textDecor: "none" }}
              onClick={(e) => e.preventDefault()}
            >
              Yamada UI
            </Heading>
          </Box>
          <VStack flex={1}>
            <HStack justify="flex-end">{secondaryItems}</HStack>
            <SegmentedControl
              gap={0}
              as="nav"
              justifyContent="flex-end"
              value={active}
            >
              {mainItems}
            </SegmentedControl>
          </VStack>
        </HStack>
      </Container>
    </Box>
  )
}

export default DoubleHeader
