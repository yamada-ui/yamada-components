import type { FC } from "react"
import {
  Accordion,
  AccordionItem,
  AccordionLabel,
  AccordionPanel,
  Divider,
  HStack,
  Image,
  LinkBox,
  LinkOverlay,
  Spacer,
  Tag,
  Text,
  VStack,
} from "@yamada-ui/react"
import { Label } from "./label"
import { links } from "./links"
import { Nested } from "./nested"
import { UserMenu } from "./user-menu"

const NavbarNested: FC = () => {
  return (
    <VStack
      bg={["white", "whiteAlpha.100"]}
      borderRightWidth="1px"
      gap="0"
      h="full"
      p="0"
      w={{ base: "md", sm: "full" }}
    >
      <HStack borderBottomWidth="1px" p="md">
        <HStack
          gap="sm"
          justifyContent={{ base: "start", md: "center" }}
          userSelect="none"
        >
          <Image
            src="/favicon.svg"
            alt="Yamada UI"
            draggable={false}
            height={30}
            width={30}
          />
          <Text fontSize="xl" fontWeight="semibold">
            Yamada UI
          </Text>
        </HStack>
        <Spacer />
        <Tag size="sm" variant="solid">
          v2.0.0
        </Tag>
      </HStack>
      <VStack as="nav" draggable={false} gap="0" overflowY="auto" py="lg">
        {links.map((link) =>
          link.items ? (
            <Accordion key={link.name} variant="unstyled" isToggle>
              <AccordionItem>
                <AccordionLabel
                  px="md"
                  _hover={{ bg: ["blackAlpha.200", "blackAlpha.400"] }}
                >
                  <Label name={link.name} icon={link.icon} px="0" />
                </AccordionLabel>
                <AccordionPanel>
                  <Nested items={link.items} />
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          ) : (
            <LinkBox
              key={link.name}
              py="3"
              transitionDuration="normal"
              transitionProperty="common"
              _hover={{ bg: ["blackAlpha.200", "blackAlpha.400"] }}
            >
              <Label name={link.name} icon={link.icon} />
              <LinkOverlay
                href={link.href}
                onClick={(e) => e.preventDefault()}
              />
            </LinkBox>
          ),
        )}
      </VStack>
      <Spacer />
      <Divider />
      <UserMenu />
    </VStack>
  )
}

export default NavbarNested
