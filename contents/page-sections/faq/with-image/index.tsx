import {
  Accordion,
  AccordionItem,
  Flex,
  Heading,
  Image,
  VStack,
} from "@yamada-ui/react"
import FAQ from "./faq.svg"

const WithImage = () => {
  return (
    <Flex
      alignItems="center"
      flexDir={{ lg: "column" }}
      gap="lg"
      justifyContent="center"
      px="md"
      py="xl"
    >
      <Image src={FAQ.src} alt="faq" w={{ base: "lg", sm: "full" }} />
      <VStack maxW={{ base: "xl", sm: "full" }}>
        <Heading size="md" pl="md">
          Frequently Asked Questions
        </Heading>
        <Accordion variant="card" defaultIndex={0} isToggle>
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
