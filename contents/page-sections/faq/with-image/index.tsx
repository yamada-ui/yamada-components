import {
  Accordion,
  AccordionItem,
  VStack,
  Heading,
  Flex,
  Image,
} from "@yamada-ui/react"
import FAQ from "./faq.svg"

const WithImage = () => {
  return (
    <Flex
      flexDir={{ base: "row", md: "column" }}
      gap="lg"
      py="xl"
      px="md"
      alignItems="center"
      justifyContent="center"
    >
      <Image src={FAQ.src} alt="faq" w={{ base: "3xl", md: "full" }} />
      <VStack maxW={{ base: "full", md: "3xl" }}>
        <Heading pl="md" size="md">
          Frequently Asked Questions
        </Heading>
        <Accordion isToggle defaultIndex={0} variant="card">
          <AccordionItem label="How can I reset my password?">
            It can't help but hear a pin drop from over half a mile away, so it
            lives deep in the mountains where there aren't many people or
            Pokémon.It was born from sludge on the ocean floor. In a sterile
            environment, the germs within its body can't multiply, and it
            dies.It has no eyeballs, so it can't see. It checks its surroundings
            via the ultrasonic waves it emits from its mouth.
          </AccordionItem>

          <AccordionItem label="Can I create more than one account?">
            It can't help but hear a pin drop from over half a mile away, so it
            lives deep in the mountains where there aren't many people or
            Pokémon.It was born from sludge on the ocean floor. In a sterile
            environment, the germs within its body can't multiply, and it
            dies.It has no eyeballs, so it can't see. It checks its surroundings
            via the ultrasonic waves it emits from its mouth.
          </AccordionItem>

          <AccordionItem label="How can I subscribe to monthly newsletter?">
            It can't help but hear a pin drop from over half a mile away, so it
            lives deep in the mountains where there aren't many people or
            Pokémon.It was born from sludge on the ocean floor. In a sterile
            environment, the germs within its body can't multiply, and it
            dies.It has no eyeballs, so it can't see. It checks its surroundings
            via the ultrasonic waves it emits from its mouth.
          </AccordionItem>

          <AccordionItem label="Do you store credit card information securely?">
            It can't help but hear a pin drop from over half a mile away, so it
            lives deep in the mountains where there aren't many people or
            Pokémon.It was born from sludge on the ocean floor. In a sterile
            environment, the germs within its body can't multiply, and it
            dies.It has no eyeballs, so it can't see. It checks its surroundings
            via the ultrasonic waves it emits from its mouth.
          </AccordionItem>
        </Accordion>
      </VStack>
    </Flex>
  )
}

export default WithImage
